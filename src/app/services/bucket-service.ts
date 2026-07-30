import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Firebase } from '../service/firebase';
import { AuthService } from '../service/auth';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BucketItem } from '../models/BucketItem';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  private _bucketItems: BehaviorSubject<BucketItem[]> = new BehaviorSubject([] as
    BucketItem[])
  private _userBucketItems: BehaviorSubject<BucketItem[]> = new BehaviorSubject([] as
    BucketItem[])
  private firebaseObservable?: Subscription

  constructor(
    private firebaseService: Firebase,
    private authService: AuthService,
  ) {
    this.getData()
    this.getUserData()
  }

  getData() {
    try {
      this.firebaseService.readCollection("bucketItems").subscribe(
        res => {
          //map JSON from firebase to BucketItem
          let bucketItems = res.map((bucketItem: any) => new BucketItem(bucketItem.title, bucketItem.description, bucketItem.image, bucketItem.completed, bucketItem.uid, bucketItem.id))
          //update BehaviorSubject to have newest Firebase values
          this._bucketItems.next(bucketItems)
        },
      )
    } catch (err) {
      console.log(err)
    }
  }

  getUserData() {
    try {
      let uid = this.authService.getCurrentUserUid()
      this.firebaseService.readCollectionByUid("bucketItems", uid).subscribe(
        (res: any[]) => {
          let bucketItems = res.map((bucketItem: any) => new BucketItem(bucketItem.title, bucketItem.description, bucketItem.image, bucketItem.completed, bucketItem.uid, bucketItem.id))
          this._userBucketItems.next(bucketItems)
        },
      )
    } catch (err) {
      console.log(err)
    }
  }

  getItems(): Observable<BucketItem[]> {
    //turn behaviorSubject into observale we can subscribe to
    return this._bucketItems.asObservable()
  }

  getUserItems(): Observable<BucketItem[]> {
    return this._userBucketItems.asObservable()
  }

  async createBucketItem(): Promise<BucketItem> {
    const uid = this.authService.getCurrentUserUid()
    const newItem = new BucketItem('', '', '../assets/shapes.svg', false, uid)
    console.log("new item before save: " + newItem)
    const id = await this.firebaseService.createDoc(newItem, 'bucketItems')
    newItem.id = id
    return newItem
  }

  async updateBucketItem(id: string, changes: Partial<BucketItem>) {
    await this.firebaseService.updateDoc(changes, `bucketItems/${id}`)
  }

  async saveBucketItem(bucket: BucketItem) {
    bucket.uid = this.authService.getCurrentUserUid()
    await this.firebaseService.createDoc(bucket, `bucketItems`)
  }

  async deleteBucketItem(bucket: BucketItem) {
    await this.firebaseService.deleteDoc(`bucketItems/${bucket.id}`)
  }

  ngOnDestroy() {
    this.firebaseObservable?.unsubscribe()
  }

  // toggleComplete(id: number) {
  //   const item = this.bucketItems.find(x => x.id === id);

  //   if (item) {
  //     item.completed = !item.completed;
  //   }
  // }
}

export { BucketItem };