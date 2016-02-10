import {
    describe,
    beforeEachProviders,
    inject,
    it,
} from 'angular2/testing';
import {checkPresent} from '../src/app/util';

describe('Utility: ', () => {
    describe('checkPresent()', () => {
        it('is not present for null', () => {
            expect(checkPresent(null)).toBeFalsy();
        });

        it('is not present for undefined', () => {
            expect(checkPresent(undefined)).toBeFalsy();
        });

        it('is not present for empty string', () => {
            expect(checkPresent('')).toBeFalsy();
        });

        it('is present for "foo"', () => {
            expect(checkPresent('foo')).toBeTruthy();
        });
    });
});
