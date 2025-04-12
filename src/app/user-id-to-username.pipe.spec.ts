import { UserIdToUsernamePipe } from './user-id-to-username.pipe';

describe('UserIdToUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new UserIdToUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
