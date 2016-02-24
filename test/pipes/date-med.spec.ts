import {describe, it, fdescribe} from 'angular2/testing';
import {DateMedPipe} from '../../src/pipes/date-med.pipe';

describe('Pipe: MedDateFormat', () => {
    let pipe:DateMedPipe;

    beforeEach(() => {
        pipe = new DateMedPipe();
    });

    it('parses a date', () => {
        let d = new Date(2016, 1, 2, 8, 30, 59);
        expect(pipe.transform(d)).toEqual('Jan 2, 8:30');
    });

    it('parses shows afternoon in 12h format', () => {
        let d = new Date(2016, 9, 2, 14, 30, 59);
        console.log(d);
        expect(pipe.transform(d)).toEqual('Sept 2, 2:30');
    });

    it('returns empty for invalid inputs', () => {
        expect(pipe.transform(undefined)).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform(<any>{ isDate: false })).toEqual('');
        expect(pipe.transform(<any>'')).toEqual('');
    });
});
