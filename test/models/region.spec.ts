import { Region } from '../../src/models/region';

describe('Model: Region', () => {
    it('should construct correctly', () => {
        const r = new Region(1, 2, 'foo', 'bar', 3, 4);
        expect(r.id).toBe(1);
        expect(r.number).toBe(2);
        expect(r.name).toBe('foo');
        expect(r.mapFile).toBe('bar');
        expect(r.lat).toBe(3);
        expect(r.lon).toBe(4);
    });

    describe('ctor fromNumber', () => {
        it('should throw for invalid lookup', () => {
            expect(() => { Region.fromNumber(9999); }).toThrowError(RangeError);
        });

        it('should return a lookup', () => {
            const r = Region.REGIONS[0];
            expect(Region.fromNumber((r.number))).toEqual(r);
        });
    });

    describe('ctor fromId', () => {
        it('should throw for invalid lookup', () => {
            expect(() => { Region.fromId(9999); }).toThrowError(RangeError);
        });

        it('should return a lookup', () => {
            const r = Region.REGIONS[0];
            expect(Region.fromId(r.id)).toEqual(r);
        });
    });

    describe('equals', () => {
        it('should succeed on the same region', () => {
            const r1 = new Region(10, 100, '', '', 0, 0);
            const r2 = new Region(10, 100, '', '', 0, 0);

            expect(r1.equals(r1)).toBeTruthy();
            expect(r1.equals(r2)).toBeTruthy();
        });

        it('should fail for different regions', () => {
            const r1 = new Region(10, 100, '', '', 0, 0);
            const r2 = new Region(20, 100, '', '', 0, 0);
            expect(r1.equals(r2)).toBeFalsy();
            expect(r1.equals(null)).toBeFalsy();
        });
    });

    xdescribe('configuration', () => {
        // TODO: Validate configuration (map exists, coordinates in range, number formats, etc)
    });
});
