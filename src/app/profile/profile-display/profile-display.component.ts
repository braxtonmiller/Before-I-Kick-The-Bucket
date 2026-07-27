import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss'],
  standalone: false
})
export class ProfileDisplayComponent  implements OnInit {

@Input ({required: true}) profileIn!: Profile

  constructor() { }

  ngOnInit() {}

 profileData: Profile = {
      username: this.profileIn.username,
      email: this.profileIn.email,
      phoneNumber: this.profileIn.phoneNumber,
      profilePicture: this.profileIn.profilePicture,
      bucketListItems: this.profileIn.bucketListItems
    };

}
