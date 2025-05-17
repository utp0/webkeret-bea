import { Injectable } from '@angular/core';
import { Firestore, collection, doc, docData, collectionData, DocumentReference, query, orderBy, addDoc, serverTimestamp, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Video } from '../model/Video';
import { User } from '../model/User';

@Injectable({
    providedIn: 'root'
})
export class VideosService {
    private videosCollectionRef!: CollectionReference;

    constructor(private firestore: Firestore) {
        this.videosCollectionRef = collection(this.firestore, 'videos');
    }

    getAllVideos(orderByField: keyof Video = 'shareDate', direction: 'asc' | 'desc' = 'desc'): Observable<Video[]> {
        const q = query(this.videosCollectionRef, orderBy(orderByField, direction));
        return collectionData(q, { idField: 'id' }) as Observable<Video[]>;
    }

    getVideoById(id: string): Observable<Video | undefined> {
        const videoDocRef = doc(this.firestore, `videos/${id}`);
        return docData(videoDocRef, { idField: 'id' }) as Observable<Video | undefined>;
    }

    async createVideo(videoData: Omit<Video, 'id' | 'sharer' | 'shareDate'>, sharerUserId: string): Promise<DocumentReference> {
        const userDocRef = doc(this.firestore, `users/${sharerUserId}`) as DocumentReference<User>;
        const newVideoPayload = { ...videoData, sharer: userDocRef, shareDate: serverTimestamp() };
        return addDoc(this.videosCollectionRef, newVideoPayload);
    }
}