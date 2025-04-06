import { UnixToHumandatetimePipe } from './unix-to-humandatetime.pipe';

describe('UnixToHumandatetimePipe', () => {
  it('create an instance', () => {
    const pipe = new UnixToHumandatetimePipe();
    expect(pipe).toBeTruthy();
  });
});
