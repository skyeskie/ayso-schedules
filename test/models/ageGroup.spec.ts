import {
    describe,
    beforeEach,
    beforeEachProviders,
    expect,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
    xit,
} from 'angular2/testing';

import {expectUniqueness} from '../util/set';
import {AgeGroup} from '../../src/models/ageGroup';

describe('Model: AgeGroup', () => {
    it('should create a group', () => {
        let ag = new AgeGroup(1,20);
        expect(ag.code).toBe(1);
        expect(ag.cutoff).toBe(20);
    });

    it('should return a formatted string', () => {
        let ag = new AgeGroup(0, 42);
        expect(ag.toString()).toEqual('U42');
    });

    describe('ctor fromCutoff', () => {
        it('should throw for invalid lookup', () => {
            expect(() => { AgeGroup.fromCutoff(-10); }).toThrowErrorOfType('RangeError');
        });

        it('should return a lookup', () => {
            let ag = AgeGroup.AGES[0];
            expect(AgeGroup.fromCutoff(ag.cutoff)).toEqual(ag);
        });
    });

    describe('equals', () => {
        it('should succeed on the same gender', () => {
            let r1 = new AgeGroup(1,10);
            let r2 = new AgeGroup(1,10);

            expect(r1.equals(r1)).toBeTruthy();
            expect(r1.equals(r2)).toBeTruthy();
        });

        it('should fail for different genders', () => {
            let r1 = new AgeGroup(1,10);
            let r2 = new AgeGroup(2,20);
            expect(r1.equals(r2)).toBeFalsy();
            expect(r1.equals(null)).toBeFalsy();
        });
    });

    describe('configuration', () => {
        it('should have unique codes', () => {
            expectUniqueness<number>(AgeGroup.AGES.map(ag => ag.code));
        });

        it('should have unique cutoff ages', () => {
            expectUniqueness<number>(AgeGroup.AGES.map(ag => ag.cutoff));
        });
    });
});
