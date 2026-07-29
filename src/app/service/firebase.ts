import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentReference, Firestore, Query, query, setDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Firebase {

  constructor(
    private firestore: Firestore,
  ) {

  }

  // Create
  async createDoc<T extends Object>(objectToCreate: T, path: string): Promise<string> {
    let colRef = collection(this.firestore, path)
    let docRef = await addDoc(colRef, JSON.parse(JSON.stringify(objectToCreate)))
    return docRef.id
  }

  /**
    * Read
    * Reads an entire firebase collection and returns the
    * result as an observable of the provided type
    **/
  readCollection<T extends Object>(collectionName: string):
    Observable<T[]> {
    let collectionRef: CollectionReference = collection(this.firestore,
      collectionName)
    return collectionData(collectionRef, { idField: 'id' }) as Observable<T[]>
  }

  readDocument<T extends Object>(path: string): Observable<T | undefined> {
    let docRef = doc(this.firestore, path)
    return docData(docRef) as Observable<T | undefined>
  }

  // Read by UID
  readCollectionByUid<T extends Object>(collectionName: string, uid: string): Observable<T[]> {
    let collectionRef: CollectionReference = collection(this.firestore, collectionName)
    let q: Query = query(collectionRef, where('uid', '==', uid))
    return collectionData(q, { idField: 'id' }) as Observable<T[]>;
  }

  /**
    * Update
    * path should follow the format "collectionName/documentName"
    
    * creates (or updates) a single document in firebase db.
    * Mostly here as a placeholder if a custom update function is needed
    **/

  // async updateDoc<T extends Object>(updatedObject: T, path: string) {
  //   let documentRef: DocumentReference = doc(this.firestore, path);
  //   await setDoc(documentRef, JSON.parse(JSON.stringify(updatedObject)))
  // }

  async updateDoc<T extends Object>(updatedObject: Partial<T>, path: string) {
    let documentRef: DocumentReference = doc(this.firestore, path);
    await setDoc(documentRef, JSON.parse(JSON.stringify(updatedObject)), { merge: true })
  }

  /**
  * Delete
  * path should follow the format "collectionName/documentName"
  * deletes a single document in firebase db
  **/
  async deleteDoc(path: string) {
    let documentRef: DocumentReference = doc(this.firestore, path);
    await deleteDoc(documentRef)
  }

}

