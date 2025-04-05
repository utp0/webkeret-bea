import { Injectable } from '@angular/core';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  user: User | undefined = undefined;
}
