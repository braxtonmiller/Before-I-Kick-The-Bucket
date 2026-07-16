import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/profile/models/profile';

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

}
