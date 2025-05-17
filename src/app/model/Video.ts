import { DocumentReference } from "@angular/fire/firestore";

export interface Video {
    id: string;
    title: string;
    originalUrl: string;
    length: number;
    sharer: DocumentReference;
    shareDescription: string;
    shareDate: number;  // unix time
}
