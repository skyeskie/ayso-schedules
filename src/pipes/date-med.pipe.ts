import { Pipe, PipeTransform } from '@angular/core';

import { ClassLogger, Logger } from '../service/log.decorator';

//
//
// So this pipe puts for custom format: '
/**
 * DatePipe requires Intl and has limited usage: http://caniuse.com/#search=intl
 * Issue: https://github.com/angular/angular/issues/3333
 *
 * Until fixed, using fixed manual format.
 *
 * Returned format: 'Mon 12, 3:45'
 */
@Pipe({name: 'dateMed'})
export class DateMedPipe implements PipeTransform {
    @ClassLogger() log: Logger;

    months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
    ];

    transform(date: Date): string {
        if (!(date instanceof Date)) {
            this.log.warn('Invalid date object: ' + date);
            return '';
        }

        const sb = [];
        sb.push(this.months[date.getMonth()]);
        sb.push(' ');
        sb.push(date.getDate().toString()); // day of month
        sb.push(', ');
        let hours = date.getHours();
        if (hours > 12) {
            hours -= 12;
        }
        sb.push(hours.toString());
        sb.push(':');
        const minutes = date.getMinutes();
        if (minutes < 10) {
            sb.push('0');
        }
        sb.push(minutes.toString());

        return sb.join('');
    }
}
