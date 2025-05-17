import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), provideFirebaseApp(() => initializeApp({ projectId: "videomegoszto-1d59d", appId: "1:465732746500:web:10c5c9e3965a62616be451", storageBucket: "videomegoszto-1d59d.firebasestorage.app", apiKey: "AIzaSyB9OHjVYTAF90ziRbkieGSPivJPTO5F2EY", authDomain: "videomegoszto-1d59d.firebaseapp.com", messagingSenderId: "465732746500", measurementId: "G-1CKH8XLKSG" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())
  ]
};
