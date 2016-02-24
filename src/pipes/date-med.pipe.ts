import {PipeTransform, Pipe} from 'angular2/core';
import {StringJoiner} from 'angular2/src/facade/lang';

import {ClassLogger, Logger} from '../service/log.decorator';

@Pipe({name: 'dateMed'})
class DateMedPipe implements PipeTransform {
    @ClassLogger log:Logger;

    months: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    transform(date:Date): string {
        if(!(date instanceof Date)) {
            this.log.warn('Invalid date object: ' + date);
            return '';
        }

        let sb = new StringJoiner();
        sb.add(this.months[date.getMonth() - 1]);
        sb.add(' ');
        sb.add(date.getDate().toString()); //day of month
        sb.add(', ');
        let hours = date.getHours();
        if(hours > 12) {
            hours -= 12;
        }
        sb.add(hours.toString());
        sb.add(':');
        sb.add(date.getMinutes().toString());

        return sb.toString();
    }
}

export { DateMedPipe as default, DateMedPipe }
