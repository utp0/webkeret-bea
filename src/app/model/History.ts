import { DocumentReference } from "@angular/fire/firestore";

export interface ViewHistory {
    id: string;
    userId: DocumentReference;
    videoId: DocumentReference;
    timestamp: number;
}
