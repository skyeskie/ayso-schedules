import {describe} from 'angular2/testing';
import {weekCacheInterfaceSpec} from '../interfaces/week-cache.spec.i';
import {InMemoryWeeksService} from '../../src/dao/mem/weeks.mem.service';
import {StaticInitializationService} from '../../src/dao/init/static.init.service';

describe('DAO: InMemoryWeekCache', () => {
    weekCacheInterfaceSpec(InMemoryWeeksService, StaticInitializationService);
});
