import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

interface User {
  profileUsername: string;
  profileEmail: string;
  profilePhoneNumber: string;
  profileImageURL: string;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: false,
})
export class CommunityPage implements OnInit {

  searchText: string = '';

  friends: User[] = [];

  filteredFriends: User[] = [];

  constructor(
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {

    const usersRef = collection(this.firestore, 'users');

    collectionData(usersRef, { idField: 'id' })
      .subscribe((users: any[]) => {

        this.friends = users.map(user => ({
          profileUsername: user.username || '',
          profileEmail: user.email || '',
          profilePhoneNumber: user.phoneNumber || '',
          profileImageURL:
            user.profilePicture && user.profilePicture !== ''
              ? user.profilePicture
              : 'https://ionicframework.com/docs/img/demos/avatar.svg'
        }));

        this.filteredFriends = [...this.friends];

        console.log('Users loaded:', this.friends);
      });
  }

  searchFriends() {

    const search = this.searchText.toLowerCase().trim();

    if (search === '') {
      this.filteredFriends = [...this.friends];
      return;
    }

    this.filteredFriends = this.friends.filter(friend =>
      friend.profileUsername.toLowerCase().includes(search) ||
      friend.profileEmail.toLowerCase().includes(search)
    );
  }

  openProfile(friend: User) {

    console.log('Opening profile:', friend.profileUsername);

    // Future:
    // this.router.navigate(['/profile', friend.profileUsername]);

  }

  trackByUsername(index: number, friend: User): string {
    return friend.profileUsername;
  }

}