import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.page.html',
  styleUrls: ['./add-photos.page.scss'],
  standalone: false,
})

/*N2S - the implemenation of this page would be where you can click 
a button to add a photo to a bucket list item, so what I need to do 
is have an add photo button, as well as a way to go straight to the 
camera - so I might need two pages, with one being to select photos 
and another being to select bucket list items to add ur photos to*/

/*Or maybe see if I can have the selection for the bucket lists be
a popup and see if I can get that to work, and maybe try to change
the page after the user is done adding to bucket lists*/

export class AddPhotosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
