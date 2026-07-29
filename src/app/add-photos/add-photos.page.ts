import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { CameraComponent } from '../components/camera/camera.component';
import { BucketItem } from '../models/BucketItem';
import { BucketService } from '../services/bucket-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.page.html',
  styleUrls: ['./add-photos.page.scss'],
  standalone: false,
})
export class AddPhotosPage implements OnInit, OnDestroy {

  bucketItemArray: BucketItem[] = [];
  selectedItems: BucketItem[] = [];
  imageBase64: string | undefined;

  private itemsSub?: Subscription;

  constructor(
    private modalController: ModalController,
    private bucketService: BucketService
  ) {}

  ngOnInit() {
    this.itemsSub = this.bucketService.getUserItems().subscribe(items => {
      this.bucketItemArray = items;
    });
  }

  compareWithFn(o1: BucketItem, o2: BucketItem): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  async addBucketListItem() {
    await this.bucketService.createBucketItem();
    // no need to manually push to bucketItemArray - getUserItems() will emit the update automatically
  }

  async takePhoto() {
    if (this.selectedItems.length === 0) {
      console.log("Must select bucket list items before you can take a photo");
      return;
    }

    let modal = await this.modalController.create({
      component: CameraComponent
    });

    modal.onDidDismiss().then(async (dataObject: any) => {
      if (dataObject && dataObject.data) {
        const photo = dataObject.data;
        for (const item of this.selectedItems) {
          if (item.id) {
            await this.bucketService.updateBucketItem(item.id, { image: photo });
          }
        }
      }
    });

    await modal.present();
  }

  async getPhotoFromDevice() {
    if (this.selectedItems.length === 0) {
      console.log("Must select bucket list items before choosing a photo");
      return;
    }

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });

      this.imageBase64 = image.base64String;
      console.log("imageBase64: " + this.imageBase64)

      if (this.imageBase64) {
        for (const item of this.selectedItems) {
          if (item.id) {
            await this.bucketService.updateBucketItem(item.id, { image: this.imageBase64 });
          }
        }
      }
    } catch (error) {
      console.error('User cancelled or error occurred', error);
    }
  }

  ngOnDestroy() {
    this.itemsSub?.unsubscribe();
  }
}










// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { CameraComponent } from '../components/camera/camera.component';
// import { doc, Firestore, getDoc } from '@angular/fire/firestore';
// import { Auth } from '@angular/fire/auth';
// import { BucketListItem } from '../models/bucket-list-item';
// import { Profile } from '../models/profile';
// import { UserProfileService } from '../services/user-profile';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

// @Component({
//   selector: 'app-add-photos',
//   templateUrl: './add-photos.page.html',
//   styleUrls: ['./add-photos.page.scss'],
//   standalone: false,
// })

// export class AddPhotosPage implements OnInit {

//   currentProfile?: Profile;

//   //test array for the sole purpose of implementation
//   bucketItemArray: BucketListItem[] = [
//     new BucketListItem("Snowboarding", "filler", false, ""),
//     new BucketListItem("Skiing", "filler", false, ""),
//     new BucketListItem("Backpacking", "filler", true, ""),];
//   imageBase64: string | undefined;

//   //actual array with no info
//   //bucketItemArray: BucketListItem[] = [];

//   //testArray: BucketListItem[] = [new BucketListItem("test 1", "", true, ""), new BucketListItem("Jerry", "", false, "")];
//   selectedItems: BucketListItem[] = [];

//   constructor(private auth: Auth, private firestore: Firestore, private modalController: ModalController, private userProfileService: UserProfileService) {
//     this.currentProfile = this.userProfileService.currentProfile;
//     //this.bucketItemArray = this.currentProfile.profileBucketListItems;
//   }

//   compareWithFn(o1: BucketListItem, o2: BucketListItem): boolean {
//     return o1 && o2 ? o1.itemName === o2.itemName : o1 === o2;
//   }

//   async ngOnInit() {

//   }

//   addBucketListItem() {
//     console.log("need to add functionality to pull user's bucket list array and add to it");
//   }

//   async takePhoto() {
//     if (this.selectedItems.length == 0) {
//       //TODO - change this to a popup in a window
//       console.log("Must select bucket list items before you can take a photo");
//     } else {
//       let modal = await this.modalController.create({
//         component: CameraComponent
//       })

//       modal.onDidDismiss().then((dataObject: any) => {
//         console.log(dataObject)
//         if (dataObject) {
//           for (let i = 0; i < this.selectedItems.length; i++) {
//             this.selectedItems[i].itemPhoto = dataObject.data;
//           }
//           //this.savedImageString = data; // Saved to page variable
//         }
//       })

//       await modal.present();

//     }
//   }

//   addPhoto() {
//     // for(let i=0; i < this.selectedItems.length; i++) {
//     //   console.log(this.selectedItems[i].itemName);
//     // }
//     // if(this.selectedItems.length == 0) {
//     //   console.log("No items selected");
//     // }
//     //console.log("need to have access to a person's photos and also need to implement allow photos");
//     for (let i = 0; i < this.bucketItemArray.length; i++) {
//       console.log(this.bucketItemArray[i].itemName);
//     }
//     if (this.selectedItems.length == 0) {
//       console.log("no items in selectedItems[]");
//     } else {
//       for (let i = 0; i < this.selectedItems.length; i++) {
//         console.log(this.selectedItems[i].itemName);
//         console.log(this.selectedItems[i].itemPhoto);
//       }
//     }
//   }

//   //remove later, this is only for testing
//   displayPhoto() {
//     this.imageBase64 = this.selectedItems[0].itemPhoto;

//     console.log("imageBase64 is " + this.imageBase64) // returning an object for some reason? 
//   }

//   async getPhotoFromDevice() {
//     try {
//       const image = await Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.Base64,
//         source: CameraSource.Prompt // Prompts user for Camera or Gallery
//       });

//       // The raw base64 string data
//       this.imageBase64 = image.base64String;

//       // Optional: prepend data URI scheme if you want to bind it to an <img> tag src
//       // const imageUrl = `data:image/${image.format};base64,${image.base64String}`;
//     } catch (error) {
//       console.error('User cancelled or error occurred', error);
//     }
//   }

// }
