import { Injectable, inject } from '@angular/core';
import { User as AppUserModel } from '../model/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { doc, docData, Firestore, setDoc, serverTimestamp } from '@angular/fire/firestore';

import { Auth as NgFireAuthToken } from '@angular/fire/auth';
import { Auth as FirebaseSDKAuth, User as FirebaseSDKUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { map, switchMap, tap, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private firestore: Firestore = inject(Firestore);
    private firebaseSDKAuth: FirebaseSDKAuth = inject(NgFireAuthToken) as FirebaseSDKAuth;

    private firebaseUserSnapshotSubject = new BehaviorSubject<FirebaseSDKUser | null>(null);
    public firebaseUser$: Observable<FirebaseSDKUser | null>;

    private currentUserSnapshotSubject = new BehaviorSubject<AppUserModel | null>(null);
    public currentUser$: Observable<AppUserModel | null>;

    constructor() {
        this.firebaseUser$ = new Observable<FirebaseSDKUser | null>(subscriber => {
            const unsubscribe = onAuthStateChanged(
                this.firebaseSDKAuth,
                (user) => subscriber.next(user),
                (error) => subscriber.error(error),
                () => subscriber.complete()
            );
            return unsubscribe;
        }).pipe(
            tap(fbUser => this.firebaseUserSnapshotSubject.next(fbUser)),
            shareReplay(1)
        );

        this.currentUser$ = this.firebaseUser$.pipe(
            switchMap(firebaseUser => {
                if (firebaseUser) {
                    return docData(doc(this.firestore, `users/${firebaseUser.uid}`), { idField: 'id' }) as Observable<AppUserModel | undefined>;
                } else {
                    return of(undefined);
                }
            }),
            map(userDoc => userDoc || null),
            tap(appUser => {
                this.currentUserSnapshotSubject.next(appUser);
            }),
            shareReplay(1)
        );

        this.currentUser$.subscribe();
    }

    getCurrentUserId(): string | null {
        const fbUser = this.firebaseUserSnapshotSubject.value;
        return fbUser ? fbUser.uid : null;
    }

    getCurrentUser(): AppUserModel | null {
        return this.currentUserSnapshotSubject.value;
    }

    getUserById(id: string): Observable<AppUserModel | undefined> {
        const userDocRef = doc(this.firestore, `users/${id}`);
        return docData(userDocRef, { idField: 'id' }) as Observable<AppUserModel | undefined>;
    }

    async login(email: string, password: string): Promise<FirebaseSDKUser | null> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.firebaseSDKAuth, email, password);
            console.log('Bejelentkezve:', userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error('Hiba bejelentkezéskor:', error);
            return null;
        }
    }

    async register(email: string, password: string): Promise<FirebaseSDKUser | null> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.firebaseSDKAuth, email, password);
            const firebaseUser = userCredential.user;
            console.log('Regisztrálva:', userCredential.user);

            if (firebaseUser && firebaseUser.email) {
                const newUserDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);

                const username = firebaseUser.email.split('@')[0];

                const appUserData: Omit<AppUserModel, 'id'> = {
                    username: username,
                    email: firebaseUser.email,
                    registrationDate: Date.now()
                };
                
                await setDoc(newUserDocRef, appUserData);


                return firebaseUser;
            }
        } catch (error) {
            console.error('Giba regisztrációkor:', error);
            return null;
        }
        return null;
    }

    async logout(): Promise<void> {
        try {
            await signOut(this.firebaseSDKAuth);
            console.log('Logged out');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}