import { Component } from '@angular/core';

interface User {
  username: string;
  name: string;
  profilePicture: string;
}
@Component({
  standalone: false,
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage {

  searchText: string = '';

  friends: User[] = [
    {
      username: 'finno',
      name: 'Finn Oroszi',
      profilePicture: 'https://ionicframework.com/docs/img/demos/avatar.svg'
    },
    {
      username: 'jane23',
      name: 'Jane Smith',
      profilePicture: 'https://ionicframework.com/docs/img/demos/avatar.svg'
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
      friend.username.toLowerCase().includes(search) ||
      friend.name.toLowerCase().includes(search)
    );
  }

  openProfile(friend: User) {
    console.log('Opening profile:', friend.username);

    // Later:
    // this.router.navigate(['/profile', friend.username]);
  }

}