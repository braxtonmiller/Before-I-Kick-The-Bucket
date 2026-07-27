import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, combineLatest, map, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private firestore: Firestore = inject(Firestore);

  // 1. Get all registered accounts for Explore
  getExploreUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<any[]>;
  }

  getFriendsList(currentUser: string): Observable<any[]> {
    const friendshipsRef = collection(this.firestore, 'friendships');

    const querySent = query(friendshipsRef, where('senderUsername', '==', currentUser));
    const queryReceived = query(friendshipsRef, where('receiverUsername', '==', currentUser));

    // FIX: Using combineLatest lets real-time Firestore streams pass through immediately
    return combineLatest([
      collectionData(querySent, { idField: 'docId' }),
      collectionData(queryReceived, { idField: 'docId' })
    ]).pipe(
      map(([sent, received]) => {
        const unified = [...sent, ...received];
        console.log('Live Firestore friendships combined stream:', unified);
        return unified;
      })
    );
  }

  // 3. Send request using 'from()' to handle async Promise correctly
  sendFriendRequest(sender: string, receiver: string): Observable<any> {
    const friendshipsRef = collection(this.firestore, 'friendships');
    return from(addDoc(friendshipsRef, {
      senderUsername: sender,
      receiverUsername: receiver,
      status: 'pending',
      timestamp: new Date()
    }));
  }

  // 4. FIX: Use snapshot.docs[0].id to get the correct string ID from the document array
  acceptFriendRequest(receiver: string, sender: string): Observable<any> {
    const friendshipsRef = collection(this.firestore, 'friendships');
    const q = query(friendshipsRef, where('senderUsername', '==', sender), where('receiverUsername', '==', receiver));

    const updatePromise = getDocs(q).then(snapshot => {
      if (!snapshot.empty) {
        // FIX: Extract id from the first document in the matched array list
        const targetDocId = snapshot.docs[0].id;
        const docRef = doc(this.firestore, 'friendships', targetDocId);
        return updateDoc(docRef, { status: 'accepted' });
      }
      throw new Error('No friend request document found to accept');
    });

    return from(updatePromise);
  }

  // 5. Delete relationship completely
  removeFriend(currentUser: string, targetUser: string): Observable<any> {
    const friendshipsRef = collection(this.firestore, 'friendships');

    const deletePromise = getDocs(friendshipsRef).then(snapshot => {
      const batchDeletes: Promise<void>[] = [];

      snapshot.docs.forEach(document => {
        const data = document.data();
        const matchA = data['senderUsername'] === currentUser && data['receiverUsername'] === targetUser;
        const matchB = data['senderUsername'] === targetUser && data['receiverUsername'] === currentUser;

        if (matchA || matchB) {
          const docRef = doc(this.firestore, 'friendships', document.id);
          batchDeletes.push(deleteDoc(docRef));
        }
      });

      return Promise.all(batchDeletes);
    });

    return from(deletePromise);
  }
}