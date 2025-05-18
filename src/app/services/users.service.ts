import { Injectable } from '@angular/core';
import { Firestore, collection, doc, docData, collectionData, DocumentReference, addDoc, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private usersCollectionRef!: CollectionReference;

    constructor(private firestore: Firestore) {
        this.usersCollectionRef = collection(this.firestore, 'users');
    }

    getAllUsers(): Observable<User[]> {
        return collectionData(this.usersCollectionRef, { idField: 'id' }) as Observable<User[]>;
    }

    getUserById(id: string): Observable<User | undefined> {
        const userDocRef = doc(this.firestore, `users/${id}`);
        return docData(userDocRef, { idField: 'id' }) as Observable<User | undefined>;
    }

    async createUser(userData: Omit<User, 'id' | 'registrationDate'>): Promise<DocumentReference> {
        return addDoc(this.usersCollectionRef, { ...userData, registrationDate: Date.now() });
    }
}