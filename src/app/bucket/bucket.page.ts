import { Component, OnInit } from '@angular/core';
import { Bucket, BucketItem } from '../services/bucket';


@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.page.html',
  styleUrls: ['./bucket.page.scss'],
  standalone: false,
})
export class BucketPage implements OnInit {

userName = "Katie";

bucketList: BucketItem[] = [];


  constructor(private bucketService: Bucket) { }

  ngOnInit() {
  this.bucketList = this.bucketService.getItems();

  // Temporary sample data while your partner is still working
  if (this.bucketList.length === 0) {
    this.bucketService.addItem({
      id: 1,
      title: "Study Abroad in Spain",
      description: "Spend spring semester in Spain.",
      image: "assets/images/spain.jpg",
      completed: false
    });

    this.bucketService.addItem({
      id: 2,
      title: "Go Skydiving",
      description: "Schedule Jump Omaha in August.",
      image: "assets/images/skydive.jpg",
      completed: true
    });

    this.bucketList = this.bucketService.getItems();
  }
}

get completedItems(): number {
  return this.bucketList.filter(item => item.completed).length;
}

get totalItems(): number {
  return this.bucketList.length;
}

get progress(): number {
  if (this.totalItems === 0) {
    return 0;
  }

  return (this.completedItems / this.totalItems) * 100;
}

toggle(id: number) {
  this.bucketService.toggleComplete(id);
}

}
