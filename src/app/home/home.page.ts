import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  ) { }

  ngOnInit() { }

  ionViewDidEnter(){
    
  }

  get goalsCompletedPercent(): number {
    return Math.round((this.goalsCompleted / this.goalsTotal) * 100);
  }

  async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
