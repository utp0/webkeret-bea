import { DocumentReference } from "@angular/fire/firestore"; 

export interface Comment {
    id: string;
    videoId: DocumentReference;
    userId: DocumentReference;
    content: string;
    timestamp: number;
}
