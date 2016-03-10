import {PipeTransform, Pipe} from 'angular2/core';
import {StringJoiner} from 'angular2/src/facade/lang';

import {ClassLogger, Logger} from '../service/log.decorator';

//
//
//So this pipe puts for custom format: '
/**
 * DatePipe requires Intl and has limited usage: http://caniuse.com/#search=intl
 * Issue: https://github.com/angular/angular/issues/3333
 *
 * Until fixed, using fixed manual format.
 *
 * Returned format: 'Mon 12, 3:45'
 */
@Pipe({name: 'dateMed'})
class DateMedPipe implements PipeTransform {
    @ClassLogger() log:Logger;

    months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    transform(date:Date): string {
        if(!(date instanceof Date)) {
            this.log.warn('Invalid date object: ' + date);
            return '';
        }

        let sb = new StringJoiner();
        sb.add(this.months[date.getMonth()]);
        sb.add(' ');
        sb.add(date.getDate().toString()); //day of month
        sb.add(', ');
        let hours = date.getHours();
        if(hours > 12) {
            hours -= 12;
        }
        sb.add(hours.toString());
        sb.add(':');
        let minutes = date.getMinutes();
        if(minutes < 10) {
            sb.add('0');
        }
        sb.add(minutes.toString());

        return sb.toString();
    }
}

export { DateMedPipe as default, DateMedPipe }
