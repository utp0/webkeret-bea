import { SecsToHumantimePipe } from './secs-to-humantime.pipe';

describe('SecsToHumantimePipe', () => {
  it('create an instance', () => {
    const pipe = new SecsToHumantimePipe();
    expect(pipe).toBeTruthy();
  });
});
