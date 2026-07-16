import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  emailIn: string = '';
  passwordIn: string = '';

  registerEmailIn: string = '';
  registerPasswordIn: string = '';
  registerPasswordConfIn: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async login() {
    let result = this.authService.login(this.emailIn, this.passwordIn);

    if (result != null) {
      this.router.navigateByUrl('tabs/home');
    }
    else {
      window.alert('Incorrect Login');
    }
  }

  async register() {
    let result = await this.authService.register(this.registerEmailIn, this.registerPasswordIn, this.registerPasswordConfIn);
  
    if (result != null) {
      this.router.navigateByUrl('home');
    }
    else {
      window.alert('Account Creation Failed');
    }
  }

}
