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

function weekCacheInterfaceSpec(impl: any) {
    describe('interface tests', () => {
        beforeEachProviders(() => [impl]);

        describe('getMaxWeeks', () => {
            it('should return a promise', inject([impl], (dao) => {
                expect(dao.getMaxWeeks()).toBePromise();
            }));
        });

        //TODO: Eventually will want to check logic of current week
        describe('getCurrentWeek', () => {
            it('should return a promise', inject([impl], (dao) => {
                expect(dao.getMaxWeeks()).toBePromise();
            }));
        });

        it('has reset and update', inject([impl], (dao) => {
            dao.reset();
            dao.update(true);
            dao.update(false);
        }));

    });
}

export {weekCacheInterfaceSpec as default, weekCacheInterfaceSpec}
