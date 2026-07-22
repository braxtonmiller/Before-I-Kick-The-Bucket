import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss'],
  standalone: false,
})
export class RegisterComponent implements OnInit {

  registerEmailIn: string = '';
  registerPasswordIn: string = '';
  registerPasswordConfIn: string = '';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() { }

  // async submitRecipe() {

  //     try {

  //       let recipeToAdd = new Recipe(this.ingredientIn, this.directionsIn, this.nameIn, this.cookTimeIn, this.prepTimeIn)

  //       if (this.nameIn == "" || this.cookTimeIn == "" || this.prepTimeIn == "" || this.directionsIn.length == 0 || this.ingredientIn.length == 0) {
  //         let alert = await this.alertController.create({
  //           header: "Error",
  //           message: "Why did you leave stuff blank stupidhead",
  //           buttons: ["OK"]
  //         })

  //         await alert.present()
  //         return
  //       }

  //       this.recipeService.saveRecipe(recipeToAdd)

  //       this.nameIn = ""
  //       this.cookTimeIn = ""
  //       this.prepTimeIn = ""
  //       this.directionsIn = []
  //       this.ingredientIn = []

  //       this.dismissModal()

  //       let alert = await this.alertController.create({
  //         header: "Recipe Added",
  //         message: "Good Job Cuh",
  //         buttons: ["OK"]

  //       })
  //       await alert.present()
  //     }
  //   }


  async register() {
    try {
      let result = await this.authService.register(this.registerEmailIn, this.registerPasswordIn, this.registerPasswordConfIn);

      if (result != null) {
        this.router.navigateByUrl('home');
      }
      else {
        window.alert('Account Creation Failed');
      }
    }
    catch (error: any) {
      console.log("Error")

      let alert = await this.alertController.create({
        header: "Error",
        message: "Failed to Add Account",
        buttons: ["OK"]
      })

      await alert.present()
    }
  }

  dismissModal() {

    this.modalController.dismiss()

  }

  // clearPasswords() {
  //   this.passwordIn = '';
  //   this.registerPasswordIn = '';
  //   this.registerPasswordConfIn = '';
  // }

}
