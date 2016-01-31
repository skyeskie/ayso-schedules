import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';
import Division from '../../src/models/division';
import {GENDERS} from '../../src/cfg/gender';
import {AGES} from '../../src/cfg/ages';


describe('Division', () => {
    it('should display the name given', () => {
        let divis = new Division(GENDERS[0], AGES[0]);
        expect(divis.getDisplayName()).toBe('U19 Boys');

        let divis2 = new Division(GENDERS[1], AGES[3]);
        expect(divis2.getDisplayName()).toBe('U12 Girls')
    });

    describe('fromString', () => {
        it('should create a division object', () => {
            let divis = Division.fromString('U10B');
            expect(divis.getDisplayName()).toBe('U10 Boys');
        });

        it('should create an object without the U prefix', () => {
            let divis = Division.fromString('10B');
            expect(divis.getDisplayName()).toBe('U10 Boys');
        });

        it('should throw an error on invalid age portion', () => {
            expect(() => { Division.fromString('U42B') }).toThrowError(RangeError);
        });

        it('should throw an error on invalid gender portion', () => {
            expect(() => { Division.fromString('U42Z') }).toThrowError(RangeError);
        });

        it('should throw an error on invalid format', () => {
            console.log('B10 check');
            expect(() => { Division.fromString('B10') }).toThrowError(RangeError);
        })
    });
});
