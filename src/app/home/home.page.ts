import { Component } from '@angular/core';
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
