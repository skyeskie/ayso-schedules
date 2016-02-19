import {Inject, Injectable, Optional} from 'angular2/core';

import {IInitializationService} from '../init/initialization.interface';
import WeekCacheInterface from '../week-cache.interface';
import {calculateCurrentWeek} from '../week-cache.interface';
import {ClassLogger, Logger, Level} from '../../service/log.decorator';
import {ILocalStorage} from './settings.ls.service';

const SAVED_WEEKS_KEY = 'ayso-week-starts';

@Injectable()
class LocalStorageWeeksService implements WeekCacheInterface {
    @ClassLogger public log: Logger;

    public initialized:boolean;
    private initializePromise: Promise<any> = null;

    private weekStarts:Date[];
    private max:number = 1;
    private cur:number = 1;

    constructor(
        @Inject(ILocalStorage)
        private client:ILocalStorage,
        @Inject(IInitializationService)
        private initializer: IInitializationService
    ) {
        let starts = this.loadWeekStarts();

        if(starts === null) {
            this.initialized = false;
            this.initializePromise = this.init();
        } else {
            this.weekStarts = starts;
            this.initialized = true;
            this.initializePromise = Promise.resolve();
        }
    }

    getMaxWeeks(): number {
        return this.max;
    }

    getCurrentWeek(): number {
        return this.cur;
    }

    clear(): Promise<void> {
        this.cur = 1;
        this.max = 1;
        this.weekStarts = [];
        this.client.removeItem(SAVED_WEEKS_KEY);
        return Promise.resolve();
    }

    init(): Promise<number> {
        if(this.initializePromise!==null) {
            //We've already been here
            return this.initializePromise;
        }

        if(this.initializer === null) {
            return Promise.reject<number>(
                new ReferenceError('Could not initialize the weeks cache')
            );
        }

        return this.initializer.getWeekStarts().then((starts:Date[]) => {
            this.weekStarts = starts;
            this.max = starts.length;

            this.cur = calculateCurrentWeek(starts);
            this.persistWeekStarts();

            return Promise.resolve(this.max);
        });
    }

    private loadWeekStarts(): Date[] {
        let savedString = this.client.getItem(SAVED_WEEKS_KEY);
        if(typeof savedString === 'string' && savedString.length > 0) {
            let timestamps = savedString.split(',');
            return timestamps.map((timestamp:string) => Number.parseInt(timestamp, 10))
                             .map((timestamp:number) => new Date(timestamp));
        }
        return null;
    }

    private persistWeekStarts() {
        this.client.setItem(SAVED_WEEKS_KEY,
            this.weekStarts.map((date:Date) => date.valueOf()).join(',')
        );
    }
}

export { LocalStorageWeeksService as default, LocalStorageWeeksService, WeekCacheInterface }
