import { Injectable } from '@angular/core';

import { ILocalStorage, LS_KEYS } from '../../service/local-storage.interface';
import { ClassLogger, Logger } from '../../service/log.decorator';
import { calculateCurrentWeek, WeekCacheDAO, WeekCacheInterface } from '../week-cache.interface';

@Injectable()
class LocalStorageWeeksService implements WeekCacheInterface {
    @ClassLogger() public log: Logger;

    public initialized: boolean;
    private initializePromise: Promise<any> = null;

    private weekStarts: Date[] = [];
    private max: number = 1;
    private cur: number = 1;

    constructor(
        private client: ILocalStorage,
    ) {
        this.loadWeekStarts();
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
        this.client.removeItem(LS_KEYS.WEEKS_CACHE);
        return Promise.resolve();
    }

    init(starts: Date[]): Promise<number> {
        this.weekStarts = starts;
        this.max = starts.length;

        this.cur = calculateCurrentWeek(starts);
        this.persistWeekStarts();

        return Promise.resolve(this.max);
    }

    isInit(): boolean {
        return (this.weekStarts.length > 0);
    }

    private loadWeekStarts(): void {
        const savedString = this.client.getItem(LS_KEYS.WEEKS_CACHE);
        if (typeof savedString === 'string' && savedString.length > 0) {
            const timestamps = savedString.split(',');
            this.weekStarts = timestamps.map((timestamp: string) => parseInt(timestamp, 10))
                                        .map((timestamp: number) => new Date(timestamp));
            this.max = this.weekStarts.length;

            this.cur = calculateCurrentWeek(this.weekStarts);
        }
    }

    private persistWeekStarts(): void {
        this.client.setItem(LS_KEYS.WEEKS_CACHE,
            this.weekStarts.map((date: Date) => date.valueOf()).join(','),
        );
    }
}

const LOCAL_STORAGE_WEEK_CACHE_PROVIDER = { provide: WeekCacheDAO, useClass: LocalStorageWeeksService };

export { LOCAL_STORAGE_WEEK_CACHE_PROVIDER, LocalStorageWeeksService, WeekCacheInterface };
