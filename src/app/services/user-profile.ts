
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Firebase } from '../service/firebase';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BucketItem } from '../models/BucketItem';
import { Profile } from '../models/profile';
import { User } from '@angular/fire/auth';
import { AuthService } from '../service/auth';

@Injectable({ providedIn: 'root' })

export class UserProfileService {
  private _currentProfile = new BehaviorSubject<Profile | undefined>(undefined)

  constructor(
    private firebaseService: Firebase,
    private authService: AuthService,
  ) {
    this.loadCurrentProfile()
  }

  loadCurrentProfile() {
    try {
      const uid = this.authService.getCurrentUserUid()
      this.firebaseService.readDocument<Profile>(`users/${uid}`).subscribe(profile => {
        this._currentProfile.next(profile)
      })
    } catch (err) {
      console.log(err)
    }
  }

  getCurrentProfile(): Observable<Profile | undefined> {
    return this._currentProfile.asObservable()
  }

  async saveProfile(changes: Partial<Profile>) {
    const uid = this.authService.getCurrentUserUid()
    await this.firebaseService.updateDoc(changes, `users/${uid}`)
  }
}






// import { Injectable } from '@angular/core';
// import { Firestore } from '@angular/fire/firestore';
// import { Firebase } from '../service/firebase';
// import { BehaviorSubject, Observable, Subscription } from 'rxjs';
// import { BucketItem } from '../models/BucketItem';
// import { Profile } from '../models/profile';
// import { User } from '@angular/fire/auth';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserProfileService {

//   private _profiles: BehaviorSubject<Profile[]> = new BehaviorSubject([] as
//     Profile[]);
//     private firebaseObservable?: Subscription
//     currentProfile: Profile = new Profile("", "", "", "")

//   constructor(
//     private firebaseService: Firebase,
//   ) {
//     this.getData()
//   }

//   getData() {
//     try {
//       this.firebaseService.readCollection("users").subscribe(
//         res => {
//           //map JSON from firebase to BucketItem
//           let profileInfo = res.map((user: any) => new Profile(user.profileUsername, user.profileEmail, user.profilePhoneNumber, user.profileImageURL, user.profileBucketListItems))
//           //update BehaviorSubject to have newest Firebase values
//           this._profiles.next(profileInfo)
//         },
//       )
//     } catch (err) {
//       console.log(err)
//     }
//   }



//   getItems(): Observable<Profile[]> {
//     //turn behaviorSubject into observale we can subscribe to
//     return this._profiles.asObservable()
//   }
//   async saveProfile(profile: Profile) {

//     await this.firebaseService.createDoc(profile, `users`)
//   }

//   async deleteProfile(profile: Profile) {
//     await this.firebaseService.deleteDoc(`users/${profile.uid}`)
//   }

//   ngOnDestroy() {
//     this.firebaseObservable?.unsubscribe()
//   }

//   // toggleComplete(id: number) {
//   //   const item = this.bucketItems.find(x => x.id === id);

//   //   if (item) {
//   //     item.completed = !item.completed;
//   //   }
//   // }
// }


  

