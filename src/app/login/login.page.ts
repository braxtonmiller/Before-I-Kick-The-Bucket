import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth';
import { Router } from '@angular/router';
import { RegisterComponent, } from '../components/register-component/register-component.component';
import { AlertController, ModalController } from '@ionic/angular';

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
    private router: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clearFields();
  }

  async login() {
    let result = await this.authService.login(this.emailIn, this.passwordIn);
    console.log(result)

    if (result != null) {
      this.router.navigateByUrl('tabs/home');
      console.log("chose option one")
    }
    else {
      window.alert('Incorrect Login');
      this.clearPasswords();
      console.log("chose option two")
    }
  }


  clearFields() {
    this.emailIn = '';
    this.registerEmailIn = '';
    this.clearPasswords();
  }

  clearPasswords() {
    this.passwordIn = '';
    this.registerPasswordIn = '';
    this.registerPasswordConfIn = '';
  }

  async presentRegister() {

    let modal = await this.modalController.create({
      component: RegisterComponent,
    });

    await modal.present();

  }

}
