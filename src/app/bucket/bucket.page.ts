import { Component, OnInit } from '@angular/core';
import { BucketService, BucketItem } from '../services/bucket-service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.page.html',
  styleUrls: ['./bucket.page.scss'],
  standalone: false,
})
export class BucketPage implements OnInit {

  userName = "Katie";

  nextId: number = 100;

  bucketList: BucketItem[] = [];

  bucketItemSubscription?: Subscription

  constructor(private bucketService: BucketService) { }

  ngOnInit() {
    // this.bucketList = this.bucketService.getItems();
    //this.bucketItemSubscription = this.bucketService.SOMETHING.subscribe

  this.bucketService.getItems().subscribe((bucketItems: BucketItem[]) => {
  this.bucketList = bucketItems;
});
      // bucketItems contains: id, title, description, image, completed
      // Update your component with the latest bucket items
    ;

    // Temporary sample data while your partner is still working
    if (this.bucketList.length === 0) {
      this.bucketService.saveBucketItem({
        id: 1,
        title: "Study Abroad in Spain",
        description: "Spend spring semester in Spain.",
        image: "assets/spain.jpg",
        completed: false
      });

      this.bucketService.saveBucketItem({
        id: 2,
        title: "Go Skydiving",
        description: "Schedule Jump Omaha in August.",
        image: "assets/skydive.jpg",
        completed: true
      });

      //this.bucketList = this.bucketService.getItems();
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

  deleteItem(id: number) {

  this.bucketList = this.bucketList.filter(
    item => item.id !== id
  );

}


  //test functions
addCompletedItem() {

  this.bucketList.push({
    id: this.nextId++,
    title: "Test Goal",
    description: "Testing progress bar",
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    completed: true
  });

}
addIncompleteItem() {

  this.bucketList.push({
    id: this.nextId++,
    title: "Test Goal",
    description: "Testing progress bar",
    image: "https://ionicframework.com/docs/img/demos/card-media.png",
    completed: false
  });

}
}

  // toggle(id: number) {
  //   this.bucketService.toggleComplete(id);
  // }


