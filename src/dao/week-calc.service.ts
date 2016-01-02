import {Injectable} from 'angular2/core';

@Injectable()
export default class WeekCalcService
{
    getMaxWeeks(): Number {
        return 8;
    }

    getCurrentWeek(): Number {
        return 5;
    }
}
