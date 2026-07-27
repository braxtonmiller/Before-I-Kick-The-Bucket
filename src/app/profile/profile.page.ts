import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';

import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { BucketListItem } from '../models/bucket-list-item';
import { UserProfileService } from '../services/user-profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  testProfileInfo: Profile = new Profile("Test Profile", "1234@gmail.com", "308-230-1234", "assets/profile-image-placeholder.avif", [])
  // smokeyInfo: Profile = new Profile("Smokey", "kajdn", "Rottweiler", "assets/Rottweiler-Smokey.jpeg")
  // barkSimpsonInfo: Profile = new Profile("Bark Simpson", "kaadjoc", "Russell Terrier", "assets/Bark Simpson.png")
  // marcusInfo: Profile = new Profile("Marcus", "andjc", "Dachshund", "assets/")


  isEditing: boolean = false;

  profileUsernameInput: string = "";
  profileEmailInput: string = "";
  profilePhoneNumberInput: string = "";
  profileImageURLInput: string = "";
  profileBucketList: BucketListItem[] = []

  currentProfile?: Profile 

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private userProfileService: UserProfileService
  ) {

  }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    console.log('get data', this.auth.currentUser!.uid)
    this.currentProfile = await this.userProfileService.getUserProfileOnce(this.auth.currentUser!.uid)
    console.log(this.currentProfile, this.currentProfile)
    
    this.profileUsernameInput = this.currentProfile.username;
    this.profileEmailInput = this.currentProfile.email;
    this.profilePhoneNumberInput = this.currentProfile.phoneNumber;
    this.profileImageURLInput = this.currentProfile.profilePicture;
  }

  async saveProfile() {
    const user = this.auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const profileData: Profile = {
      username: this.profileUsernameInput,
      email: this.profileEmailInput,
      phoneNumber: this.profilePhoneNumberInput,
      profilePicture: this.profileImageURLInput,
      bucketListItems: this.profileBucketList
    };

    try {
      await setDoc(doc(this.firestore, "users", user.uid), profileData);
      alert("Profile Saved!");

      // SWITCH VIEW: Automatically hides the input boxes and shows the display fields
      this.isEditing = false;
    } catch (error) {
      alert("Error saving profile: " + error);
    }
  }
}




//   ngOnInit() { }

//   async saveProfile() {

//     const user = this.auth.currentUser;

//     if (!user) {
//       alert("Please log in first.");
//       return;
//     }

//     const profileData = {
//       username: this.profileUsernameInput,
//       email: this.profileEmailInput,
//       phoneNumber: this.profilePhoneNumberInput,
//       profilePicture: this.profileImageURLInput
//     };

//     await setDoc(
//       doc(this.firestore, "users", user.uid),
//       profileData
//     );

//     alert("Profile Saved!");

//     this.navCtrl.navigateRoot('/profile-display.component')
//     this.router.navigate(['/profile-display.component']);
//   }
// }