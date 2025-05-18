import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewHistory } from '../model/History';
import { Firestore, collection, query, where, collectionData, doc, DocumentReference, orderBy, addDoc, serverTimestamp, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {


  private historyCollection!: CollectionReference;

  constructor(private firestore: Firestore) {
    this.historyCollection = collection(this.firestore, 'history');
  }

  getHistoryByUserId(userId: string, limitCount: number = 20): Observable<ViewHistory[]> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    const q = query(this.historyCollection,
      where('userId', '==', userDocRef),
      orderBy('timestamp', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<ViewHistory[]>;
  }

  async addHistoryEntry(userId: string, videoId: string): Promise<DocumentReference | undefined> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    const videoDocRef = doc(this.firestore, `videos/${videoId}`);
    const newHistoryEntry = {
      userId: userDocRef,
      videoId: videoDocRef,
      timestamp: serverTimestamp()
    };
    return addDoc(this.historyCollection, newHistoryEntry);
  }
}