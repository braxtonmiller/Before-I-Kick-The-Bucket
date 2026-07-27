import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FriendService } from '../services/friend';
import { ToastController, AlertController } from '@ionic/angular';
import { UserProfileService } from '../services/user-profile';
import { Profile } from '../models/profile';
import { AuthService } from '../service/auth';
import { Subscription } from 'rxjs';

interface User {
  profileUsername: string;
  profileEmail: string;
  profilePhoneNumber: string;
  profileImageURL: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: false,
})
export class CommunityPage implements OnInit {
  currentTab: string = 'feed';

  // FIX: Identify your active test profile username account here 
  // (Change this string value to test receiving a request as another registered user!)
  currentProfile?: Profile;

  posts: any[] = [
    { text: 'Welcome to the community feed!' },
    { text: 'Check out the new friends tab above!' }
  ];

  friends: User[] = [];
  pendingRequests: User[] = [];
  filteredFriends: User[] = [];
  searchText: string = '';

  feedSub?: Subscription
  requestSub?: Subscription
  exploreSub?: Subscription

  private allExploreUsersMasterList: any[] = [];

  constructor(
    private firestore: Firestore,
    private friendService: FriendService,
    private toastController: ToastController,
    private alertController: AlertController,
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {

   }

  async ngOnInit() {
    this.loadCommunityFeed();
    this.currentProfile = await this.userProfileService.getUserProfileOnce(this.authService.getCurrentUserUid())
    this.loadFriendsData()
    this.loadExploreUsers()
  }

  ngOnDestroy() {
    this.feedSub?.unsubscribe()
    this.exploreSub?.unsubscribe()
    this.requestSub?.unsubscribe()
  }
  

  searchFriends() {
    if (!this.searchText || this.searchText.trim() === '') {
      this.filteredFriends = this.allExploreUsersMasterList;
      return;
    }
    const lowerSearch = this.searchText.toLowerCase();
    this.filteredFriends = this.allExploreUsersMasterList.filter(user =>
      user.profileUsername.toLowerCase().includes(lowerSearch) ||
      user.profileEmail.toLowerCase().includes(lowerSearch)
    );
  }

  toggleInfo(friend: User) {
    friend.expanded = !friend.expanded;
  }

  tabChanged(event: any) {

  }

  loadExploreUsers() {
    this.exploreSub = this.friendService.getExploreUsers().subscribe({
      next: (databaseUsers) => {
        console.log('in subscription')
        // Exclude the current logged-in profile from showing up on their own explore tab
        const filteredDbUsers = databaseUsers.filter(u => u.username !== this.currentProfile?.username);

        const formatted = filteredDbUsers.map(user => ({
          profileUsername: user.username || user.profileUsername || 'Unknown User',
          profileEmail: user.email || user.profileEmail || '',
          profilePhoneNumber: user.phoneNumber || user.phone || user.profilePhoneNumber || '',
          profileImageURL: user.profilePicture || user.profileImageURL || user.photoURL || user.avatar || user.image || 'assets/profile-image-placeholder.avif',
          expanded: false
        }));
        this.allExploreUsersMasterList = formatted;
        this.filteredFriends = formatted;
      },
      error: (err) => console.error('Could not load explore users', err)
    });
  }

  loadCommunityFeed() {
    // Keep your core feed logic here
    // this.feedSub = ... TODO!!!

  }

  loadFriendsData() {
    this.requestSub =this.friendService.getFriendsList(this.currentProfile!.username).subscribe({
      next: (relationships: any[]) => {

        // Pull master account fields from the 'users' collection to accurately append emails and avatars
        const usersRef = collection(this.firestore, 'users');
        // Explicitly map document id mapping tokens onto raw rows payload
        collectionData(usersRef, { idField: 'id' }).subscribe((allUsers: any[]) => {
          const formatted: any[] = [];

          relationships.forEach(rel => {
            // Find out which username belongs to the friend in this relationship row
            const friendUsername = (rel.senderUsername === this.currentProfile!.username) ? rel.receiverUsername : rel.senderUsername;

            // FIX: Robust check mapping comparing fields, names, or the database document ID itself
            const matchedUser = allUsers.find(u =>
              u.username === friendUsername ||
              u.profileUsername === friendUsername ||
              u.id === friendUsername
            );

            const dbImage = matchedUser?.profilePicture || matchedUser?.profileImageURL || matchedUser?.photoURL || matchedUser?.avatar;

            formatted.push({
              profileUsername: friendUsername,
              profileEmail: matchedUser?.email || matchedUser?.profileEmail || 'No email shared',
              profilePhoneNumber: matchedUser?.phoneNumber || matchedUser?.phone || '',
              profileImageURL: (dbImage && dbImage.trim() !== '') ? dbImage : 'assets/profile-image-placeholder.avif',
              expanded: false,
              status: rel.status,
              // Track who sent it to safely sort into pending vs incoming requests lists
              senderUsername: rel.senderUsername
            });
          });

          // Active mutual relationships
          this.friends = formatted.filter(f => f.status === 'accepted');

          // Incoming requests only (where you are the receiver and status is pending)
          this.pendingRequests = formatted.filter(f => f.status === 'pending' && f.senderUsername !== this.currentProfile!.username);
          console.log('Pending Requests Processed Layout List:', this.pendingRequests);
          console.log('Active Mutual Friends Processed Layout List:', this.friends);
        });
      },
      error: (err: any) => console.error('Could not load friends list arrays', err)
    });
  }

  accept(requestUsername: string) {
    this.friendService.acceptFriendRequest(this.currentProfile!.username, requestUsername).subscribe({
      next: () => {
        this.loadFriendsData(); // Refresh list layout from live database updates
      },
      error: (err: any) => console.error('Could not accept friend request', err)
    });
  }


  // Triggered when a user clicks the "Ignore" button next to an incoming request
  ignore(requestUsername: string) {
    this.friendService.removeFriend(this.currentProfile!.username, requestUsername).subscribe({
      next: async () => {
        // Create a native toast notification confirming the action
        const toast = await this.toastController.create({
          message: `Ignored friend request from ${requestUsername}.`,
          duration: 2000,
          position: 'bottom',
          color: 'medium'
        });
        await toast.present();

        // Refresh your local friends tab arrays instantly
        this.loadFriendsData();
      },
      error: (err: any) => console.error('Could not ignore friend request', err)
    });
  }


  async removeFriend(friendUsername: string) {
    const alert = await this.alertController.create({
      header: 'Remove Friend',
      message: `Are you sure you want to remove "${friendUsername}" from your friends list?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Unfriend action canceled by user');
          }
        },
        {
          text: 'Remove',
          role: 'destructive', // Gives the button a distinct style (red on some platforms)
          handler: () => {
            // This code executes ONLY if the user taps the 'Remove' button
            this.friendService.removeFriend(this.currentProfile!.username, friendUsername).subscribe({
              next: async () => {
                const toast = await this.toastController.create({
                  message: `${friendUsername} has been removed from your friends.`,
                  duration: 2000,
                  position: 'bottom',
                  color: 'danger'
                });
                await toast.present();

                this.loadFriendsData(); // Refresh list layout from live database updates
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  sendRequest(user: any) {
    this.friendService.sendFriendRequest(this.currentProfile!.username, user.profileUsername).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: `Friend request sent to ${user.profileUsername}!`,
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();
        this.filteredFriends = this.filteredFriends.filter(f => f.profileUsername !== user.profileUsername);
      },
      error: (err: any) => console.error('Failed to send friend request', err)
    });
  }
}