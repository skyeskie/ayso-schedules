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

import {REGIONS, getRegionById, getRegionByNumber, Region} from '../../src/cfg/regions';

describe('Model: Region', () => {
    it('should construct correctly', () => {
        let r = new Region(1, 2, 'foo', 'bar', 3, 4);
        expect(r.id).toBe(1);
        expect(r.number).toBe(2);
        expect(r.name).toBe('foo');
        expect(r.mapFile).toBe('bar');
        expect(r.lat).toBe(3);
        expect(r.lon).toBe(4);
    });

    describe('getRegionByNumber', () => {
        it('should throw for invalid lookup', () => {
            expect(() => { getRegionByNumber(9999); }).toThrowError(RangeError);
        });

        it('should return a lookup', () => {
            let r = REGIONS[0];
            expect(getRegionByNumber(r.number)).toEqual(r);
        });
    });

    describe('getRegionById', () => {
        it('should throw for invalid lookup', () => {
            expect(() => { getRegionById(9999); }).toThrowError(RangeError);
        });

        it('should return a lookup', () => {
            let r = REGIONS[0];
            expect(getRegionById(r.id)).toEqual(r);
        });
    });

    describe('equals', () => {
        it('should succeed on the same region', () => {
            let r1 = new Region(10,100,'','',0,0);
            let r2 = new Region(10,100,'','',0,0);

            expect(r1.equals(r1)).toBeTruthy();
            expect(r1.equals(r2)).toBeTruthy();
        });

        it('should fail for different regions', () => {
            let r1 = new Region(10,100,'','',0,0);
            let r2 = new Region(20,100,'','',0,0);
            expect(r1.equals(r2)).toBeFalsy();
            expect(r1.equals(null)).toBeFalsy();
        });
    });

    xdescribe('configuration', () => {
        //TODO: Validate configuration (map exists, coordinates in range, number formats, etc)
    });
});
