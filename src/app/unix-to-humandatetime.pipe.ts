import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixToHumandatetime'
})
export class UnixToHumandatetimePipe implements PipeTransform {

  private months = [
    "Január", "Február", "Március", "Április",
    "Május", "Június", "Július", "Augusztus",
    "Szeptember", "Október", "November", "December"
  ];

  transform(value: number, ...args: unknown[]): unknown {
    const date = new Date(value);

    if (isNaN(date.getTime())) return '';

    const year = date.getFullYear();
    const month = this.months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}. ${month} ${day}., ${hours}:${minutes}:${seconds}`;
  }

}
