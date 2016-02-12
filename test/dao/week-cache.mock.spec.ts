import {describe} from 'angular2/testing';
import {weekCacheInterfaceSpec} from '../interfaces/week-cache.spec.i';
import {InMemoryWeeksService} from '../../src/dao/mem/weeks.mem.service';

describe('DAO: MockWeekCache', () => {
    weekCacheInterfaceSpec(InMemoryWeeksService);
});
