import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FriendService } from '../services/friend';
import { ToastController, AlertController } from '@ionic/angular';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

interface User {
  profileUsername: string;
  profileEmail: string;
  profilePhoneNumber: string;
  profileImageURL: string;
  expanded?: boolean;
  relationStatus?: string;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
  standalone: false,
})
export class CommunityPage implements OnInit {
  currentTab: string = 'feed';

  // 2. THIS VARIABLE IS NOW POPULATED DYNAMICALLY BY FIREBASE SESSIONS
  myCurrentUsername: string = '';
  private authSubscription!: Subscription;

  posts: any[] = [
    { text: 'Welcome to the community feed!' },
    { text: 'Check out the new friends tab above!' }
  ];

  friends: User[] = [];
  pendingRequests: User[] = [];
  filteredFriends: User[] = [];
  searchText: string = '';

  private allExploreUsersMasterList: any[] = [];

  constructor(
    private firestore: Firestore,
    private friendService: FriendService,
    private toastController: ToastController,
    private alertController: AlertController,
    private auth: Auth
  ) { }

  ngOnInit() {
    this.loadCommunityFeed();

    // 1. Listen for the authenticated user session stream on page load
    this.authSubscription = user(this.auth).subscribe((currentUser) => {
      if (currentUser && currentUser.email) {
        const authEmail = currentUser.email;
        console.log('Active authentication session email detected:', authEmail);

        // 2. Query your 'users' collection to pull the profile document that matches this email
        const usersRef = collection(this.firestore, 'users');
        collectionData(usersRef, { idField: 'id' }).subscribe((allUsers: any[]) => {

          // Find the profile record where the email property matches the auth login session email
          const myProfile = allUsers.find(u =>
            (u.email && u.email.toLowerCase() === authEmail.toLowerCase()) ||
            (u.profileEmail && u.profileEmail.toLowerCase() === authEmail.toLowerCase())
          );

          if (myProfile) {
            // 3. FIX: Assign your core string variable to their real, unique username field!
            this.myCurrentUsername = myProfile.username || myProfile.profileUsername || myProfile.id;
            console.log('Linked auth email to database user profile name:', this.myCurrentUsername);

            // 4. Safely initialize your tab views now that your user context identity string is loaded
            if (this.currentTab === 'friends') {
              this.loadFriendsData();
            } else if (this.currentTab === 'explore') {
              this.loadExploreUsers();
            }
          } else {
            console.warn('Authentication email exists, but no matching profile row was found inside the users collection.');
            // Fallback to the email string prefix nickname if profile document is completely missing
            this.myCurrentUsername = authEmail.split('@')[0];
          }
        });
      } else {
        console.warn('No active login session detected on this browser instance.');
      }
    });
  }

  // Clean up memory subscription pipelines when navigating out of the community tabs view
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
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
    // Prevent unauthenticated calls if user session hasn't loaded yet
    if (!this.myCurrentUsername) return;

    if (this.currentTab === 'friends') {
      this.loadFriendsData();
    } else if (this.currentTab === 'explore') {
      this.loadExploreUsers();
    }
  }

  loadExploreUsers() {
    if (!this.myCurrentUsername) return;

    this.friendService.getExploreUsers(this.myCurrentUsername).subscribe({
      next: (databaseUsers) => {
        this.friendService.getFriendsList(this.myCurrentUsername).subscribe({
          next: (relationships: any[]) => {

            // Map over ALL database profiles (excluding yourself)
            const filteredDbUsers = databaseUsers.filter(u => {
              const username = u.username || u.profileUsername || u.id;
              return username !== this.myCurrentUsername;
            });

            const formatted = filteredDbUsers.map(user => {
              const targetUsername = user.username || user.profileUsername || user.id;

              // Find if any relationship entry matches this specific user
              const matchedRel = relationships.find(rel =>
                rel.senderUsername === targetUsername || rel.receiverUsername === targetUsername
              );

              return {
                profileUsername: targetUsername,
                profileEmail: user.email || user.profileEmail || '',
                profilePhoneNumber: user.phoneNumber || user.phone || user.profilePhoneNumber || '',
                profileImageURL: user.profilePicture || user.profileImageURL || user.photoURL || user.avatar || user.image || 'assets/profile-image-placeholder.avif',
                expanded: false,
                // Assign relationStatus based on Firestore records
                relationStatus: matchedRel ? matchedRel.status : 'none'
              };
            });

            this.allExploreUsersMasterList = formatted;
            this.filteredFriends = formatted;
          }
        });
      },
      error: (err) => console.error('Could not load explore users', err)
    });
  }

  loadCommunityFeed() {
    // Keep your core feed logic here
  }

  loadFriendsData() {
    this.friendService.getFriendsList(this.myCurrentUsername).subscribe({
      next: (relationships: any[]) => {

        // Pull master account fields from the 'users' collection to accurately append emails and avatars
        const usersRef = collection(this.firestore, 'users');
        // Explicitly map document id mapping tokens onto raw rows payload
        collectionData(usersRef, { idField: 'id' }).subscribe((allUsers: any[]) => {
          const formatted: any[] = [];

          relationships.forEach(rel => {
            // Find out which username belongs to the friend in this relationship row
            const friendUsername = (rel.senderUsername === this.myCurrentUsername) ? rel.receiverUsername : rel.senderUsername;

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
          this.pendingRequests = formatted.filter(f => f.status === 'pending' && f.senderUsername !== this.myCurrentUsername);

          console.log('Pending Requests Processed Layout List:', this.pendingRequests);
          console.log('Active Mutual Friends Processed Layout List:', this.friends);
        });
      },
      error: (err: any) => console.error('Could not load friends list arrays', err)
    });
  }

  accept(requestUsername: string) {
    this.friendService.acceptFriendRequest(this.myCurrentUsername, requestUsername).subscribe({
      next: () => {
        this.loadFriendsData(); // Refresh list layout from live database updates
      },
      error: (err: any) => console.error('Could not accept friend request', err)
    });
  }


  // Triggered when a user clicks the "Ignore" button next to an incoming request
  ignore(requestUsername: string) {
    this.friendService.removeFriend(this.myCurrentUsername, requestUsername).subscribe({
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
            this.friendService.removeFriend(this.myCurrentUsername, friendUsername).subscribe({
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
    this.friendService.sendFriendRequest(this.myCurrentUsername, user.profileUsername).subscribe({
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

  // Triggered when a user clicks the "Unadd" button to retract a pending request
  unaddRequest(user: any) {
    this.friendService.removeFriend(this.myCurrentUsername, user.profileUsername).subscribe({
      next: async () => {
        // Display a clean native toast confirmation banner
        const toast = await this.toastController.create({
          message: `Retracted friend request sent to ${user.profileUsername}.`,
          duration: 2000,
          position: 'bottom',
          color: 'warning'
        });
        await toast.present();

        // Instantly reload your live explore profiles to toggle button back to 'none' (Add)
        this.loadExploreUsers();
      },
      error: (err: any) => console.error('Failed to retract friend request from database', err)
    });
  }




}