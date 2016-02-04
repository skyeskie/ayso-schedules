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
    xit
} from 'angular2/testing';

function weekCacheInterfaceSpec(dao: any) {
    describe('interface tests', () => {
        beforeEachProviders(() => [dao]);

        describe('getMaxWeeks', () => {
            it('should return a promise', inject([dao], (dao) => {
                expect(dao.getMaxWeeks()).toBePromise();
            }))
        });

        //TODO: Eventually will want to check logic of current week
        describe('getCurrentWeek', () => {
            it('should return a promise', inject([dao], (dao) => {
                expect(dao.getMaxWeeks()).toBePromise();
            }))
        });

        it('has reset and update', inject([dao], (dao) => {
            dao.reset();
            dao.update(true);
            dao.update(false);
        }));

    });
}

export {weekCacheInterfaceSpec as default, weekCacheInterfaceSpec}
