// import { Component, OnInit } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   collectionData
// } from '@angular/fire/firestore';

import { Component } from '@angular/core';

interface User {
  profileUsername: string;
  profileEmail: string;
  profilePhoneNumber: string;
  profileImageURL: string;
}
@Component({
  standalone: false,
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage {

  trackByUsername(index: number, friend: User): string {
    return friend.profileUsername;
  }

  searchText: string = '';

  friends: User[] = [
    {
      profileUsername: 'finno',
      profileEmail: 'finn@example.com',
      profilePhoneNumber: '123-456-7890',
      profileImageURL: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      profileUsername: 'jane23',
      profileEmail: 'jane@example.com',
      profilePhoneNumber: '987-654-3210',
      profileImageURL: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },

  ];

  filteredFriends: User[] = [...this.friends];

  constructor() { }

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

    // Later:
    // this.router.navigate(['/profile', friend.profileUsername]);
  }

}