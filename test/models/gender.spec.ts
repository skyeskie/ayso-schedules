import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';
import {GENDERS, Gender, findGenderByCode} from '../../src/cfg/gender';
import {expectUniqueness} from '../util/set';

describe('Gender configuration', () => {
    it('should have unique codes', () => {
        expectUniqueness<String>(GENDERS.map(g => g.short));
    });

    it('should have unique descriptions', () => {
        expectUniqueness<String>(GENDERS.map(g => g.long));
    });

    it('should find a definded gender', () => {
        let g: Gender = GENDERS[0];
        expect(findGenderByCode(g.short)).toEqual(g);
    });

    it('should throw an error for undefined lookup', () => {
        expect(() => { findGenderByCode('BAD_LOOKUP') }).toThrowError(RangeError);
    })
});
