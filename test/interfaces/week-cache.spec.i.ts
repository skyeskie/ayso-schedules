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
import {provide} from 'angular2/core';
import {WeekCacheInterface} from '../../src/dao/week-cache.interface';
import {IInitializationService} from '../../src/dao/init/initialization.interface';
import {calculateCurrentWeek} from '../../src/dao/week-cache.interface';

const ONE = 1;

function weekCacheInterfaceSpec(impl: any, init?:any) {
    describe('(WeekCacheDAO)', () => {
        beforeEachProviders(() => [impl, provide(IInitializationService, {useValue: null})]);
        it('requires an initialization class', injectAsync([impl], (dao:WeekCacheInterface) => {
            return dao.init().then(() => {
                fail('Promise should be rejected with no initialization.');
            }, () => {
                expect(dao.getCurrentWeek()).toBe(ONE);
                expect(dao.getMaxWeeks()).toBe(ONE);
            });
        }));
    });

    describe('(WeekCacheDAO)', () => {
        beforeEachProviders(() => [impl, provide(IInitializationService, {useClass: init})]);

        describe('getMaxWeeks', () => {
            it('should return be greater than 0', injectAsync([impl], (dao: WeekCacheInterface) => {
                return dao.init().then(() => {
                    expect(dao.getMaxWeeks()).toBeGreaterThan(1);
                });
            }));
        });

        describe('getCurrentWeek', () => {
            it('should be in the range [1, maxWeeks]', injectAsync([impl], (dao: WeekCacheInterface) => {
                return dao.init().then(() => {
                    expect(dao.getCurrentWeek()).toBeGreaterThan(0);
                    expect(dao.getCurrentWeek()).toBeLessThan(dao.getMaxWeeks().valueOf() + ONE);
                });
            }));
        });

        it('resets to current 1 and max 1 on clear()', injectAsync([impl], (dao: WeekCacheInterface) => {
            return dao.init().then(() => dao.clear()).then(() => {
                expect(dao.getCurrentWeek()).toBe(ONE);
                expect(dao.getMaxWeeks()).toBe(ONE);
            });
        }));

    });
}

describe('Util: calculateCurrentWeek', () => {
    const BEFORE_DATE = new Date(2015,1,1);
    const AFTER_DATE = new Date(2017,1,1);
    const DATE_BETWEEN_3_4 = new Date(2016, 1, 18);

    let dates = [
        new Date(2016, 1,  1), //1
        new Date(2016, 1,  8), //2
        new Date(2016, 1, 15), //3
        new Date(2016, 2, 20), //7
        new Date(2016, 2,  5), //6
        new Date(2016, 2,  1), //4
        new Date(2016, 2,  3), //5
    ];

    it('throws and error with no weeks given', () => {
        expect(() => calculateCurrentWeek([])).toThrowError(RangeError);
    });

    it('returns 1 if before first week', () => {
        expect(calculateCurrentWeek(dates, BEFORE_DATE)).toBe(1);
    });

    it('returns {max} if after last week', () => {
        expect(calculateCurrentWeek(dates, AFTER_DATE)).toBe(dates.length);
    });
    it('calculates the date for an out-of-order list', () => {
        expect(calculateCurrentWeek(dates, DATE_BETWEEN_3_4)).toBe(3);
    });

    it('considers date equal as next week', () => {
        expect(calculateCurrentWeek(dates, dates[2])).toBe(3);
    });
});

export {weekCacheInterfaceSpec as default, weekCacheInterfaceSpec}
