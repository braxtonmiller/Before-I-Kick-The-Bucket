import { Component, OnInit } from '@angular/core';
import { Profile } from './models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  testProfileInfo: Profile = new Profile("Test Profile", "1234@gmail.com", "308-230-1234", "imgURL")
  smokeyInfo: Profile = new Profile("Smokey", "kajdn", "Rottweiler", "assets/Rottweiler-Smokey.jpeg")
  barkSimpsonInfo: Profile = new Profile("Bark Simpson", "kaadjoc", "Russell Terrier", "assets/Bark Simpson.png")
  marcusInfo: Profile = new Profile("Marcus", "andjc", "Dachshund", "assets/Dachshund.png")

  arrayOfInfo: Profile[] = [
    this.testProfileInfo,
    this.smokeyInfo,
    this.barkSimpsonInfo,
    this.marcusInfo,
    new Profile("Sylvie", "kjdvkj", "Mini Aussiedoodle", "assets/Mini Aussiedoodle.webp")
  ]

  profileUsernameInput: string = ""
  profileEmailInput: string = ""
  profilePhoneNumberInput: string = ""
  profileImageURLInput: string = ""
  

  constructor() { }

  ngOnInit() {

  }

  addNewProfile() {
    let newProfile = new Profile(this.profileUsernameInput, this.profileEmailInput, this.profilePhoneNumberInput, this.profileImageURLInput);
    this.arrayOfInfo.push(newProfile)
  }



}