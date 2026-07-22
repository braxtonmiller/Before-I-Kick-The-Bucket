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
      message: 'Meet at the dock. Bring sunscreen. Kayaks and life vests are provided.',
      buttons: ['Close'],
    });

    await alert.present();
  }

  async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
