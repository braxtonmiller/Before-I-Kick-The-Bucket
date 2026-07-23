import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth';
import { BucketService, BucketItem } from '../services/bucket-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  goalsCompleted = 0;
  goalsTotal = 0;
  nextEvent: BucketItem | null = null;

  suggestedEvents = [
    { title: 'Hot Air Balloon Ride', date: 'August 3, 7:00 am', image: '/assets/balloon.jpg', details: 'Rise above the valley at sunrise.' },
    { title: 'Forest Trail Hike', date: 'August 10, 9:00 am', image: '/assets/hiking.jpg', details: 'A 5-mile loop through forest.' },
    { title: 'Outdoor Concert', date: 'August 17, 8:30 am', image: '/assets/concert.jpeg', details: 'Enjoy local musicians.' },
    { title: 'Sailing', date: 'August 24, 6:00 pm', image: '/assets/sailing.jpg', details: 'A relaxed two-hour sail along the coast.' },
    { title: 'Camping', date: 'August 30, 9:00 pm', image: '/assets/camp.jpeg', details: 'Overnight camp. Bring your own sleeping bag.' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private bucketService: BucketService,
  ) { }

  ngOnInit() {
    this.bucketService.getUserItems().subscribe(items => {
      this.goalsTotal = items.length;
      this.goalsCompleted = items.filter(i => i.completed).length;
      this.nextEvent = items.find(i => !i.completed) ?? null;
    });
  }

  get goalsCompletedPercent(): number {
    if (this.goalsTotal === 0) return 0;
    return Math.round((this.goalsCompleted / this.goalsTotal) * 100);
  }

  async showEventDetails() {
    if (!this.nextEvent) return;
    const alert = await this.alertCtrl.create({
      header: this.nextEvent.title,
      subHeader: this.nextEvent.completed ? 'Completed' : 'Upcoming',
      message: this.nextEvent.description || 'No additional details yet.',
      buttons: ['Close'],
    });
    await alert.present();
  }

  async showSuggestedDetails(event: { title: string; date: string; details: string }) {
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.date,
      message: event.details,
      buttons: ['Close'],
    });
    await alert.present();
  }

  async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

}