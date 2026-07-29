import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(private auth: Auth) {

  }

  getCurrentUserUid(): string {
    if (this.auth.currentUser != null)
      {return this.auth.currentUser.uid;}
    throw new Error ('No user logged in')
  }

  async register(email: string, password: string, passwordConf: string) {
    if (password != passwordConf) {
      throw new Error('Passwords do not match');
    }
    try {
      let user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    }
    catch (e: any) {
      console.error('Registration error:', e.code, e.message);

      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      let user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    }
    catch (e: any) {
      return null;
    }
  }

  async logout() {
    return signOut(this.auth);
  }

}

