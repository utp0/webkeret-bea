import { Pipe, PipeTransform } from '@angular/core';
import { Users } from './_testdata';
import { User } from './model/User';

@Pipe({
  name: 'userIdToUsername',
  standalone: true
})
export class UserIdToUsernamePipe implements PipeTransform {

  transform(userId: string | undefined | null): string {
    if (!userId) {
      return 'Ismeretlen felhasználó';
    }
    const user: User | undefined = Users.find(u => u.id === userId);
    return user ? user.username : `Ismeretlen (${userId})`;
  }

}