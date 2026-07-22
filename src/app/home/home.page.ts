import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../service/auth';
// import { Bucket, BucketItem } from '../services/bucket';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})

export class HomePage implements OnInit {

  goalsCompleted = 16;
  goalsTotal = 50;

  suggestedEvents = [
    { title: 'Hot Air Balloon Ride', date: 'August 3, 7:00 am', image: '../../assets/balloon.jpg', details: 'Rise above the valley at sunrise.' },
    { title: 'Forest Trail Hike', date: 'August 10, 9:00 am', image: '../../assets/hiking.jpg', details: 'A 5-mile loop through forest. Wear sturdy shoes and bring water.' },
    { title: 'Outdoor Concert', date: 'August 17, 8:30 pm', image: '../../assets/concert.jpeg', details: 'Enjoy various local artists.' },
    { title: 'Sunset Sailing', date: 'August 24, 6:00 pm', image: '../../assets/sailing.jpg', details: 'A relaxed two-hour sail along the coast.' },
    { title: 'Camping', date: 'August 30, 9:00 pm', image: '../../assets/camp.jpeg', details: 'Overnight camp with a guided constellation tour.' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {

  }

  get goalsCompletedPercent(): number {
    return Math.round((this.goalsCompleted / this.goalsTotal) * 100);
  }

   async showEventDetails() {
    const alert = await this.alertCtrl.create({
      header: 'Kayaking with Friends',
      subHeader: 'July 18, 10:00 am',
      message: 'Meet at the marina dock. Bring sunscreen and a change of clothes — kayaks and life vests are provided.',
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
