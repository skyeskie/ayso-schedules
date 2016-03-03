import {Inject, Injectable, Optional} from 'angular2/core';

import {IBackend} from '../init/backend.interface.ts';
import WeekCacheInterface from '../week-cache.interface';
import {calculateCurrentWeek} from '../week-cache.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';

@Injectable()
class InMemoryWeeksService implements WeekCacheInterface {
    @ClassLogger public log: Logger;

    public initialized:boolean;
    private initializePromise: Promise<any> = null;
    private weekStarts:Date[];
    private max:number = 1;
    private cur:number = 1;

    getMaxWeeks(): number {
        return this.max;
    }

    getCurrentWeek(): number {
        return this.cur;
    }

    clear(): Promise<void> {
        this.cur = 1;
        this.max = 1;
        return Promise.resolve();
    }

    init(starts: Date[]): Promise<number> {
        this.weekStarts = starts;
        this.max = starts.length;
        this.cur = calculateCurrentWeek(starts);

        return Promise.resolve(this.max);
    }
}

export { InMemoryWeeksService as default, InMemoryWeeksService, WeekCacheInterface }
