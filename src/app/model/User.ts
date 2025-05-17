import { DocumentReference } from "@angular/fire/firestore";

export interface User {
    id: string;
    username: string;
    email: string;
    registrationDate: number;  // unix
}
