import { Injectable } from '@angular/core';
import { Firebase } from '../service/firebase';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Profile } from '../models/profile';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  private _profiles: BehaviorSubject<Profile[]> = new BehaviorSubject([] as
    Profile[]);
  private firebaseObservable?: Subscription
  private _currentProfile: BehaviorSubject<Profile> = new BehaviorSubject({} as Profile);
  private currentProfileObs?: Subscription

  constructor(
    private firebaseService: Firebase,
    private firestore: Firestore,
  ) {
    this.getData()
  }

  getData() {
    try {
      this.firebaseObservable = this.firebaseService.readCollection("users").subscribe(
        res => {
          //map JSON from firebase to BucketItem
          let profileInfo = res.map((user: any) => new Profile(user.profileUsername, user.profileEmail, user.profilePhoneNumber, user.profileImageURL, user.profileBucketListItems))
          //update BehaviorSubject to have newest Firebase values
          this._profiles.next(profileInfo)
        },
      )
    } catch (err) {
      console.log(err)
    }
  }

  getUserData(uid: string) {
    console.log(uid)
    try {
      this.currentProfileObs = this.firebaseService.readCollectionByUid<Profile>("users", uid).subscribe((users: Profile[]) => {
        this._currentProfile.next(users[0])
        console.log('user', users)
      })
    } catch (error: any) {
      console.error(error)
    }
  }
  resetUserData() {
    this.currentProfileObs?.unsubscribe()
  }

  async getUserProfileOnce(uid: string) {
    if (uid && uid.length > 0) {
      const docRef = doc(this.firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('got data', data)
        return data as Profile
      }
    }
    throw new Error('User profile not found!')
  }

  get currentProfileObsevable(): Observable<Profile> {
    return this._currentProfile.asObservable()
  }


  getItems(): Observable<Profile[]> {
    //turn behaviorSubject into observale we can subscribe to
    return this._profiles.asObservable()
  }
  async saveProfile(profile: Profile) {

    await this.firebaseService.createDoc(profile, `users`)
  }

  async deleteProfile(profile: Profile) {
    await this.firebaseService.deleteDoc(`users/${profile.uid}`)
  }

  ngOnDestroy() {
    this.firebaseObservable?.unsubscribe()
    this.currentProfileObs?.unsubscribe()
  }

  // toggleComplete(id: number) {
  //   const item = this.bucketItems.find(x => x.id === id);

  //   if (item) {
  //     item.completed = !item.completed;
  //   }
  // }
}




