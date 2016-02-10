/* tslint:disable:no-any */
import {
    describe,
    beforeEach,
    beforeEachProviders,
    expect,
    fdescribe,
    it,
    inject,
    injectAsync,
    NgMatchers,
    TestComponentBuilder,
    xit,
} from 'angular2/testing';
import {WeekCacheInterface} from '../../src/dao/week-cache.interface';

function weekCacheInterfaceSpec(impl: any) {
    describe('interface tests', () => {
        beforeEachProviders(() => [impl]);

        describe('getMaxWeeks', () => {
            it('should return a promise', inject([impl], (dao: WeekCacheInterface) => {
                expect(dao.getMaxWeeks()).toBePromise();
            }));
        });

        //TODO: Eventually will want to check logic of current week
        describe('getCurrentWeek', () => {
            it('should return a promise', inject([impl], (dao: WeekCacheInterface) => {
                expect(dao.getCurrentWeek()).toBePromise();
            }));
        });

        it('has reset and update', inject([impl], (dao: WeekCacheInterface) => {
            dao.clear();
            dao.init([]);
        }));

    });
}

export {weekCacheInterfaceSpec as default, weekCacheInterfaceSpec}
