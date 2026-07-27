import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CameraComponent } from '../components/camera/camera.component';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { BucketListItem } from '../models/bucket-list-item';
import { Profile } from '../models/profile';
import { UserProfileService } from '../services/user-profile';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth';

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

  currentProfile?: Profile;
  profileSub?: Subscription
  bucketItemArray: BucketListItem[] = [];
  //testArray: BucketListItem[] = [new BucketListItem("test 1", "", true, ""), new BucketListItem("Jerry", "", false, "")];
  selectedItems: BucketListItem[] = [];

  constructor(
    private modalController: ModalController, 
    private userProfileService: UserProfileService,
    private authService: AuthService,
  ) {

  }

  ngOnDestroy() {
    this.profileSub?.unsubscribe()
  }

  compareWithFn(o1: BucketListItem, o2: BucketListItem): boolean {
    return o1 && o2 ? o1.itemName === o2.itemName : o1 === o2;
  }

  async ngOnInit() {
    this.currentProfile = await this.userProfileService.getUserProfileOnce(this.authService.getCurrentUserUid())
    this.bucketItemArray = this.currentProfile.bucketListItems
  }

  addBucketListItem() {
    console.log("need to add functionality to pull user's bucket list array and add to it");
  }

  async takePhoto() {
    if (this.selectedItems.length == 0) {
      console.log("bucket list items must be selected before a photo is taken");
    } else {
      let modal = await this.modalController.create({
        component: CameraComponent
      })
      await modal.present();
    }
  }

  addPhoto() {
    // for(let i=0; i < this.selectedItems.length; i++) {
    //   console.log(this.selectedItems[i].itemName);
    // }
    // if(this.selectedItems.length == 0) {
    //   console.log("No items selected");
    // }
    //console.log("need to have access to a person's photos and also need to implement allow photos");
  }

}
