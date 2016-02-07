import {
    describe,
} from 'angular2/testing';
import {weekCacheInterfaceSpec} from '../interfaces/week-cache.spec.i';
import {MockWeekCacheService} from '../../src/dao/mock/MockWeekCacheService';


describe('DAO: MockWeekCache', () => {
    weekCacheInterfaceSpec(MockWeekCacheService);
});
