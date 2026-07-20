import { Injectable } from '@angular/core';

export interface BucketItem {
  id: number;
  title: string;
  description: string;
  image: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Bucket {

  private bucketItems: BucketItem[] = [];

  constructor() { }

  getItems() {
    return this.bucketItems;
  }

  addItem(item: BucketItem) {
    this.bucketItems.push(item);
  }

  toggleComplete(id: number) {
    const item = this.bucketItems.find(x => x.id === id);

    if (item) {
      item.completed = !item.completed;
    }
  }
}