import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';

import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

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


  isEditing: boolean = true;

  profileUsernameInput: string = "";
  profileEmailInput: string = "";
  profilePhoneNumberInput: string = "";
  profileImageURLInput: string = "";

  constructor(
    private firestore: Firestore,
    private auth: Auth,
  ) { }


  async ngOnInit() {
    // Automatically load their existing profile data when they open the page
    const user = this.auth.currentUser;
    if (user) {
      const docRef = doc(this.firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.profileUsernameInput = data['username'] || "";
        this.profileEmailInput = data['email'] || "";
        this.profilePhoneNumberInput = data['phoneNumber'] || "";
        this.profileImageURLInput = data['profilePicture'] || "";
        
        // If they already have a profile set up, show the display screen instead of the form
        this.isEditing = false; 
      }
    }
  }

  async saveProfile() {
    const user = this.auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const profileData = {
      username: this.profileUsernameInput,
      email: this.profileEmailInput,
      phoneNumber: this.profilePhoneNumberInput,
      profilePicture: this.profileImageURLInput
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