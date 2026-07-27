import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';
import { UserProfileService } from '../services/user-profile';


@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(
    private auth: Auth,
    private profileService: UserProfileService
  ) {
    auth.onAuthStateChanged(() => {
      this.profileService.resetUserData()
      this.profileService.getUserData(this.getCurrentUserUid())
      console.log('auth state has changed', this.getCurrentUserUid())
    })
  }

  getCurrentUserUid(): string {
    if (this.auth.currentUser != null) { return this.auth.currentUser.uid; }
    throw new Error('No user logged in')
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

