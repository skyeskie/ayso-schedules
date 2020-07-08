import { TestBed } from '@angular/core/testing';

import {
    InMemoryWeeksService,
    IN_MEM_WEEK_SERVICE_PROVIDER,
    WeekCacheInterface,
} from '../../src/dao/mem/weeks.mem.service';
import { WeekCacheDAO } from '../../src/dao/week-cache.interface';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { weekCacheInterfaceSpec } from '../interfaces/week-cache.spec.i';

describe('DAO: InMemoryWeekCache', () => {
    let dao: WeekCacheInterface;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                InMemoryWeeksService,
                IN_MEM_WEEK_SERVICE_PROVIDER,
                StaticInitializationService,
                { provide: IBackend, useExisting: StaticInitializationService },
            ],
        });

        dao = TestBed.inject<WeekCacheInterface>(WeekCacheDAO);
    });

    weekCacheInterfaceSpec();
});
