import { Injectable } from '@angular/core';

import { ClassLogger, Logger } from '../../service/log.decorator';
import { calculateCurrentWeek, WeekCacheDAO, WeekCacheInterface } from '../week-cache.interface';

@Injectable()
class InMemoryWeeksService implements WeekCacheInterface {
    @ClassLogger() public log: Logger;

    public initialized: boolean;
    private initializePromise: Promise<any> = null;
    private weekStarts: Date[] = [];
    private max: number = 1;
    private cur: number = 1;

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

    isInit(): boolean {
        return (this.weekStarts.length > 0);
    }
}

const IN_MEM_WEEK_SERVICE_PROVIDER = { provide: WeekCacheDAO, useClass: InMemoryWeeksService };

export { IN_MEM_WEEK_SERVICE_PROVIDER, InMemoryWeeksService, WeekCacheInterface };
