import {Inject, Injectable, Optional} from 'angular2/core';

import {IInitializationService} from '../init/initialization.interface';
import WeekCacheInterface from '../week-cache.interface';
import {calculateCurrentWeek} from '../week-cache.interface';

@Injectable()
class InMemoryWeeksService implements WeekCacheInterface {
    private weekStarts:Date[];
    private max:Number = 1;
    private cur:Number = 1;

    constructor(
        @Optional()
        @Inject(IInitializationService)
        private initializer
    ) {
        //No-op
    }

    getMaxWeeks(): Number {
        return this.max;
    }

    getCurrentWeek(): Number {
        return this.cur;
    }

    clear(): Promise<void> {
        return new Promise<void>(resolve => resolve());
        //No-op
    }

    init(): Promise<Number> {
        if(this.initializer === null) {
            console.log('WeekCache -- no initialization found');
            return Promise.resolve(1);
        }

        return this.initializer.getWeekStarts().then(starts => {
            console.log('WeekCache -- initializing with: ');
            console.log(starts);
            this.weekStarts = starts;
            this.max = starts.length;

            this.cur = calculateCurrentWeek(starts);

            return Promise.resolve(this.max);
        });
    }
}

export { InMemoryWeeksService as default, InMemoryWeeksService, WeekCacheInterface }
