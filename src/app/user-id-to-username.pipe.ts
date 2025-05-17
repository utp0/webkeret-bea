import { Pipe, PipeTransform } from '@angular/core';
import { User } from './model/User';
import { UsersService } from './services/users.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentReference } from '@angular/fire/firestore';

@Pipe({
  name: 'userIdToUsername',
  standalone: true
})
export class UserIdToUsernamePipe implements PipeTransform {

  constructor(private usersService: UsersService) { }

  transform(value: DocumentReference | string | undefined | null): Observable<string | undefined> {
    if (!value) {
      return of(undefined);
    }

    let userIdToFetch: string | undefined;

    if (typeof value === 'string') {
      userIdToFetch = value;
    } else if (value && typeof (value as DocumentReference).id === 'string') {
      userIdToFetch = (value as DocumentReference).id;
    } else {
      console.warn('UserIdToUsernamePipe received invalid input:', value);
      return of('Invalid User Ref');
    }

    if (!userIdToFetch) {
      return of(undefined);
    }

    return this.usersService.getUserById(userIdToFetch).pipe(
      map(user => user ? user.username : undefined)
    );
  }
}