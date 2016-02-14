import {Inject, Injectable, Optional} from 'angular2/core';

import {IInitializationService} from '../init/initialization.interface';
import WeekCacheInterface from '../week-cache.interface';
import {calculateCurrentWeek} from '../week-cache.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

@Injectable()
class InMemoryWeeksService implements WeekCacheInterface {
    @ClassLogger public log: Logger;

    public initialized = false;
    private initializePromise: Promise<any> = null;
    private weekStarts:Date[];
    private max:Number = 1;
    private cur:Number = 1;

    constructor(
        @Optional()
        @Inject(IInitializationService)
        private initializer
    ) {
        this.initializePromise = this.init();
    }

    getMaxWeeks(): Number {
        return this.max;
    }

    getCurrentWeek(): Number {
        return this.cur;
    }

    clear(): Promise<void> {
        this.cur = 1;
        this.max = 1;
        return Promise.resolve();
    }

    init(): Promise<Number> {
        if(this.initializePromise!==null) {
            //We've already been here
            return this.initializePromise;
        }

        if(this.initializer === null) {
            this.log.warn('WeekCache -- no initialization found');
            return Promise.resolve(1);
        }

        return this.initializer.getWeekStarts().then(starts => {
            this.log.debug('WeekCache -- initializing with: ', starts);
            this.weekStarts = starts;
            this.max = starts.length;

            this.cur = calculateCurrentWeek(starts);

            return Promise.resolve(this.max);
        });
    }
}

export { InMemoryWeeksService as default, InMemoryWeeksService, WeekCacheInterface }
