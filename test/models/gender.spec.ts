import { Gender } from '../../src/models/gender';
import { expectUniqueness } from '../util/set';

describe('Config: Genders', () => {
    it('should have unique codes', () => {
        expectUniqueness<string>(Gender.GENDERS.map(g => g.short));
    });

    it('should have unique descriptions', () => {
        expectUniqueness<string>(Gender.GENDERS.map(g => g.long));
    });

    describe('ctor fromCode', () => {
        it('should find a defined gender', () => {
            const g: Gender = Gender.GENDERS[0];
            expect(Gender.fromCode(g.short)).toEqual(g);
        });

        it('should throw an error for undefined lookup', () => {
            expect(() => { Gender.fromCode('BAD_LOOKUP'); }).toThrowError(RangeError);
        });
    });

    describe('equals', () => {
        it('should succeed on the same gender', () => {
            const r1 = new Gender('A', 'Gender A');
            const r2 = new Gender('A', 'Gender A');

            expect(r1.equals(r1)).toBeTruthy();
            expect(r1.equals(r2)).toBeTruthy();
        });

        it('should fail for different genders', () => {
            const r1 = new Gender('A', 'Gender A');
            const r2 = new Gender('B', 'Gender B');
            expect(r1.equals(r2)).toBeFalsy();
            expect(r1.equals(null)).toBeFalsy();
        });
    });
});
