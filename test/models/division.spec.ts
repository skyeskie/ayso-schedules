import CFG from '../../src/app/cfg';
import Division from '../../src/models/division';

describe('Model: Division', () => {
    it('should display the name given', () => {
        const divis = new Division(CFG.GENDERS[0], CFG.AGES[0]);
        expect(divis.getDisplayName()).toBe('U19 Boys');

        const divis2 = new Division(CFG.GENDERS[1], CFG.AGES[3]);
        expect(divis2.getDisplayName()).toBe('U12 Girls');
    });

    describe('fromString', () => {
        it('should create a division object', () => {
            const divis = Division.fromString('U10B');
            expect(divis.getDisplayName()).toBe('U10 Boys');
        });

        it('should create an object without the U prefix', () => {
            const divis = Division.fromString('10B');
            expect(divis.getDisplayName()).toBe('U10 Boys');
        });

        it('should throw an error on invalid age portion', () => {
            expect(() => { Division.fromString('U42B'); }).toThrowError(RangeError);
        });

        it('should throw an error on invalid gender portion', () => {
            expect(() => { Division.fromString('U42Z'); }).toThrowError(RangeError);
        });

        it('should throw an error on invalid format', () => {
            expect(() => { Division.fromString('B10'); }).toThrowError(RangeError);
        });
    });

    describe('toJSON', () => {
        it('should return empty if age not set', () => {
            const divis = new Division(CFG.GENDERS[0], null);
            expect(divis.toJSON()).toBe('');
        });
        it('should return empty if gender not set', () => {
            const divis = new Division(null, CFG.AGES[0]);
            expect(divis.toJSON()).toBe('');
        });

        it('should return a combined string', () => {
            const divis = new Division(CFG.GENDERS[0], CFG.AGES[0]);
            expect(divis.toJSON()).toBe('U19B');
        });
    });
});
