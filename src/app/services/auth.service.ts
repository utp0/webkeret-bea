// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { User as AppUserModel } from '../model/User'; // Your application's User model
import { BehaviorSubject, Observable, of } from 'rxjs';
import { doc, docData, Firestore } from '@angular/fire/firestore';

// Import AngularFire's Auth INJECTION TOKEN (this token will resolve to the Firebase SDK Auth instance)
import { Auth as NgFireAuthToken } from '@angular/fire/auth';
// Import Firebase JS SDK types, including Auth (as FirebaseSDKAuth) and User (as FirebaseSDKUser)
import { Auth as FirebaseSDKAuth, User as FirebaseSDKUser, onAuthStateChanged } from 'firebase/auth';

import { map, switchMap, tap, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private firestore: Firestore = inject(Firestore);
    // Inject using AngularFire's token. Due to provideAuth(() => getAuth()),
    // this will be an instance of the Firebase JS SDK's Auth.
    private firebaseSDKAuth: FirebaseSDKAuth = inject(NgFireAuthToken) as FirebaseSDKAuth;

    // This observable will emit FirebaseSDKUser | null
    private firebaseUserSnapshotSubject = new BehaviorSubject<FirebaseSDKUser | null>(null);
    public firebaseUser$: Observable<FirebaseSDKUser | null>;

    // This observable will emit your application's User model | null
    private currentUserSnapshotSubject = new BehaviorSubject<AppUserModel | null>(null);
    public currentUser$: Observable<AppUserModel | null>;

    constructor() {
        // Create an observable from the Firebase SDK's onAuthStateChanged method
        this.firebaseUser$ = new Observable<FirebaseSDKUser | null>(subscriber => {
            const unsubscribe = onAuthStateChanged(
                this.firebaseSDKAuth, // Use the injected Firebase JS SDK Auth instance
                (user) => subscriber.next(user), // user here is FirebaseSDKUser | null
                (error) => subscriber.error(error),
                () => subscriber.complete()
            );
            // Return the unsubscribe function to be called when the Observable is unsubscribed
            return unsubscribe;
        }).pipe(
            tap(fbUser => this.firebaseUserSnapshotSubject.next(fbUser)), // fbUser is FirebaseSDKUser | null
            shareReplay(1)
        );

        this.currentUser$ = this.firebaseUser$.pipe(
            switchMap(firebaseUser => { // firebaseUser is FirebaseSDKUser | null
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
    }

    getCurrentUserId(): string | null {
        // Get the user from the BehaviorSubject holding FirebaseSDKUser
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
}