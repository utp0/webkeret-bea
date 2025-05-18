import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/Comment';
import { Firestore, collection, query, where, collectionData, doc, DocumentReference, orderBy, addDoc, CollectionReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsCollection!: CollectionReference;

  constructor(private firestore: Firestore) {
    this.commentsCollection = collection(this.firestore, 'comments');
  }

  getCommentsByVideoId(videoId: string): Observable<Comment[]> {
    const videoDocRef = doc(this.firestore, `videos/${videoId}`);
    const q = query(this.commentsCollection, where('videoId', '==', videoDocRef), orderBy('timestamp', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Comment[]>;
  }

  async addComment(commentData: Omit<Comment, 'id' | 'videoId' | 'userId' | 'timestamp'>, videoId: string, userId: string): Promise<DocumentReference> {
    const videoDocRef = doc(this.firestore, `videos/${videoId}`);
    const userDocRef = doc(this.firestore, `users/${userId}`);
    const newComment = {
      ...commentData,
      videoId: videoDocRef,
      userId: userDocRef,
      timestamp: Date.now()
    };
    return addDoc(this.commentsCollection, newComment);
  }
}
