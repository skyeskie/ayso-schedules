import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';
import {GENDERS, Gender, findGenderByCode} from '../../src/cfg/gender';
import {expectUniqueness} from '../util/set';

describe('Config: Genders', () => {
    it('should have unique codes', () => {
        expectUniqueness<String>(GENDERS.map(g => g.short));
    });

    it('should have unique descriptions', () => {
        expectUniqueness<String>(GENDERS.map(g => g.long));
    });

    describe('findGenderByCode', () => {
        it('should find a defined gender', () => {
            let g: Gender = GENDERS[0];
            expect(findGenderByCode(g.short)).toEqual(g);
        });

        it('should throw an error for undefined lookup', () => {
            expect(() => { findGenderByCode('BAD_LOOKUP'); }).toThrowError(RangeError);
        });
    });

    describe('equals', () => {
        it('should succeed on the same gender', () => {
            let r1 = new Gender('A','Gender A');
            let r2 = new Gender('A','Gender A');

            expect(r1.equals(r1)).toBeTruthy();
            expect(r1.equals(r2)).toBeTruthy();
        });

        it('should fail for different genders', () => {
            let r1 = new Gender('A','Gender A');
            let r2 = new Gender('B','Gender B');
            expect(r1.equals(r2)).toBeFalsy();
            expect(r1.equals(null)).toBeFalsy();
        });
    });
});
