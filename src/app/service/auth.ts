import { Injectable } from '@angular/core';
import { 
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
 } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(private auth: Auth) {

  }

  async register(email: string, password: string, passwordConf: string) {

  }

  async login(email: string, password: string) {

  }

  async logout() {
    return signOut(this.auth);
  }

}

