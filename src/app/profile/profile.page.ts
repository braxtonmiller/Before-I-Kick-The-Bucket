import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Profile } from '../models/profile';
import { UserProfileService } from '../services/user-profile';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit, OnDestroy {
  isEditing: boolean = true;

  profileUsernameInput: string = "";
  profileEmailInput: string = "";
  profilePhoneNumberInput: string = "";
  profileImageURLInput: string | undefined;

  currentProfile?: Profile;
  private profileSub?: Subscription;

  constructor(
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.profileSub = this.userProfileService.getCurrentProfile().subscribe(profile => {
      if (profile) {
        this.currentProfile = profile;
        this.profileUsernameInput = profile.profileUsername;
        this.profileEmailInput = profile.profileEmail;
        this.profilePhoneNumberInput = profile.profilePhoneNumber;
        this.profileImageURLInput = profile.profileImageURL;
        this.isEditing = false; // they already have a saved profile - show display view
      }
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  async updateProfilePhoto() {
    try {
          const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Photos
          });
    
          this.profileImageURLInput = image.dataUrl;
          console.log("URL prefix:", this.profileImageURLInput?.substring(0, 30));
          console.log("imageBase64: " + this.profileImageURLInput)
    
          if (this.profileImageURLInput) {
            
await this.userProfileService.saveProfile({ profileImageURL: this.profileImageURLInput });
console.log("image saved to firebase")
            
          }
        } catch (error) {
          console.error('User cancelled or error occurred', error);
        }
  }

  async saveProfile() {
    const profileData: Partial<Profile> = {
      profileUsername: this.profileUsernameInput,
      profileEmail: this.profileEmailInput,
      profilePhoneNumber: this.profilePhoneNumberInput,
      profileImageURL: this.profileImageURLInput,
    };

    try {
      await this.userProfileService.saveProfile(profileData);
      alert("Profile Saved!");
      this.isEditing = false;
    } catch (error) {
      alert("Error saving profile: " + error);
    }
  }

  ngOnDestroy() {
    this.profileSub?.unsubscribe();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Profile } from '../models/profile';

// import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
// import { Auth } from '@angular/fire/auth';
// import { BucketListItem } from '../models/bucket-list-item';
// import { UserProfileService } from '../services/user-profile';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.page.html',
//   styleUrls: ['./profile.page.scss'],
//   standalone: false,
// })
// export class ProfilePage implements OnInit {
//   testProfileInfo: Profile = new Profile("Test Profile", "1234@gmail.com", "308-230-1234", "assets/profile-image-placeholder.avif")
//   // smokeyInfo: Profile = new Profile("Smokey", "kajdn", "Rottweiler", "assets/Rottweiler-Smokey.jpeg")
//   // barkSimpsonInfo: Profile = new Profile("Bark Simpson", "kaadjoc", "Russell Terrier", "assets/Bark Simpson.png")
//   // marcusInfo: Profile = new Profile("Marcus", "andjc", "Dachshund", "assets/")


//   isEditing: boolean = true;

//   profileUsernameInput: string = "";
//   profileEmailInput: string = "";
//   profilePhoneNumberInput: string = "";
//   profileImageURLInput: string = "";
//   profileBucketList: BucketListItem[] = []

//   currentProfile?: Profile 

//   constructor(
//     private firestore: Firestore,
//     private auth: Auth,
//     private userProfileService: UserProfileService
//   ) {
//     this.currentProfile = this.userProfileService.currentProfile;
//   }


//   async ngOnInit() {
//     // Automatically load their existing profile data when they open the page
//     const user = this.auth.currentUser;
//     if (user) {
//       const docRef = doc(this.firestore, "users", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         this.profileUsernameInput = data['username'] || "";
//         this.profileEmailInput = data['email'] || "";
//         this.profilePhoneNumberInput = data['phoneNumber'] || "";
//         this.profileImageURLInput = data['profilePicture'] || "";

//         // If they already have a profile set up, show the display screen instead of the form
//         this.isEditing = false;
//       }
//     }
//   }

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
//       profilePicture: this.profileImageURLInput,
//       bucketList: this.profileBucketList
//     };

//     try {
//       await setDoc(doc(this.firestore, "users", user.uid), profileData);
//       alert("Profile Saved!");

//       // SWITCH VIEW: Automatically hides the input boxes and shows the display fields
//       this.isEditing = false;
//     } catch (error) {
//       alert("Error saving profile: " + error);
//     }
//   }
// }




// //   ngOnInit() { }

// //   async saveProfile() {

// //     const user = this.auth.currentUser;

// //     if (!user) {
// //       alert("Please log in first.");
// //       return;
// //     }

// //     const profileData = {
// //       username: this.profileUsernameInput,
// //       email: this.profileEmailInput,
// //       phoneNumber: this.profilePhoneNumberInput,
// //       profilePicture: this.profileImageURLInput
// //     };

// //     await setDoc(
// //       doc(this.firestore, "users", user.uid),
// //       profileData
// //     );

// //     alert("Profile Saved!");

// //     this.navCtrl.navigateRoot('/profile-display.component')
// //     this.router.navigate(['/profile-display.component']);
// //   }
// // }