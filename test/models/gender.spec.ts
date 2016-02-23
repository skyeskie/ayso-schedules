import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';
import {expectUniqueness} from '../util/set';
import {Gender} from '../../src/models/gender';

describe('Config: Genders', () => {
    it('should have unique codes', () => {
        expectUniqueness<string>(Gender.GENDERS.map(g => g.short));
    });

    it('should have unique descriptions', () => {
        expectUniqueness<string>(Gender.GENDERS.map(g => g.long));
    });

    describe('ctor fromCode', () => {
        it('should find a defined gender', () => {
            let g: Gender = Gender.GENDERS[0];
            expect(Gender.fromCode(g.short)).toEqual(g);
        });

        it('should throw an error for undefined lookup', () => {
            expect(() => { Gender.fromCode('BAD_LOOKUP'); }).toThrowError(RangeError);
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
