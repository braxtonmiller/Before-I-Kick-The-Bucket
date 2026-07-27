


import { Component } from '@angular/core';

export interface BucketItem {

  id: number;

  title: string;

  description: string;

  image: string;

  completed: boolean;

}

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.page.html',
  styleUrls: ['./bucket.page.scss'],
  standalone: false,
})
export class BucketPage {

  nextId = 1;

  selectedTab = "incomplete";

  bucketList: BucketItem[] = [

    {
      id: 1,
      title: "Study Abroad",
      description: "Spend a semester in Spain.",
      image: "assets/spain.jpg",
      completed: false
    },

    {
      id: 2,
      title: "Skydiving",
      description: "Jump from 15,000 feet.",
      image: "assets/skydive.jpg",
      completed: true
    }

  ];

  get incompleteItems() {
    return this.bucketList.filter(item => !item.completed);
  }

  get completedBucketItems() {
    return this.bucketList.filter(item => item.completed);
  }

  get completedItems() {
    return this.completedBucketItems.length;
  }

  get totalItems() {
    return this.bucketList.length;
  }

  get progress() {

    if (this.totalItems == 0)
      return 0;

    return this.completedItems / this.totalItems * 100;

  }

  addBucketItem() {

    this.bucketList.unshift({

      id: this.nextId++,

      title: "New Goal",

      description: "",

      image: "https://ionicframework.com/docs/img/demos/card-media.png",

      completed: false

    });

  }

  toggleComplete(item: BucketItem) {

    item.completed = !item.completed;

  }

  deleteItem(id: number) {

    this.bucketList =
      this.bucketList.filter(item => item.id !== id);

  }

}