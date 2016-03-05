import {
    describe,
    beforeEach,
    beforeEachProviders,
    expect,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';
import Division from '../../src/models/division';
import CFG from '../../src/app/cfg';

describe('Model: Division', () => {
    it('should display the name given', () => {
        let divis = new Division(CFG.GENDERS[0], CFG.AGES[0]);
        expect(divis.getDisplayName()).toBe('U19 Boys');

        let divis2 = new Division(CFG.GENDERS[1], CFG.AGES[3]);
        expect(divis2.getDisplayName()).toBe('U12 Girls');
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
            expect(() => { Division.fromString('U42B'); }).toThrowErrorOfType('RangeError');
        });

        it('should throw an error on invalid gender portion', () => {
            expect(() => { Division.fromString('U42Z'); }).toThrowErrorOfType('RangeError');
        });

        it('should throw an error on invalid format', () => {
            expect(() => { Division.fromString('B10'); }).toThrowErrorOfType('RangeError');
        });
    });
});
