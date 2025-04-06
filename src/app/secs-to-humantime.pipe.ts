import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secsToHumantime'
})
export class SecsToHumantimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const seconds = Math.round(value);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

}
