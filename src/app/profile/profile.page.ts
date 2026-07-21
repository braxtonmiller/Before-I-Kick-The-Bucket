import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';

import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  testProfileInfo: Profile = new Profile("Test Profile", "1234@gmail.com", "308-230-1234", "assets/profile-image-placeholder.avif")
  // smokeyInfo: Profile = new Profile("Smokey", "kajdn", "Rottweiler", "assets/Rottweiler-Smokey.jpeg")
  // barkSimpsonInfo: Profile = new Profile("Bark Simpson", "kaadjoc", "Russell Terrier", "assets/Bark Simpson.png")
  // marcusInfo: Profile = new Profile("Marcus", "andjc", "Dachshund", "assets/")

  profileUsernameInput: string = "";
  profileEmailInput: string = "";
  profilePhoneNumberInput: string = "";
  profileImageURLInput: string = "";

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  ngOnInit() {}

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

    await setDoc(
      doc(this.firestore, "users", user.uid),
      profileData
    );

    alert("Profile Saved!");
  }
}