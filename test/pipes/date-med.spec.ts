import { DateMedPipe } from '../../src/pipes/date-med.pipe';

describe('Pipe: MedDateFormat', () => {
    let pipe: DateMedPipe;

    beforeEach(() => {
        pipe = new DateMedPipe();
    });

    it('parses a date', () => {
        const d = new Date(2016, 0, 2, 8, 30, 59);
        expect(pipe.transform(d)).toEqual('Jan 2, 8:30');
    });

    it('parses shows afternoon in 12h format', () => {
        const d = new Date(2016, 8, 2, 14, 30, 59);
        console.log(d);
        expect(pipe.transform(d)).toEqual('Sept 2, 2:30');
    });

    it('shows two zeros on the hour', () => {
        const d = new Date('Sep 02 2016 14:00:00');
        console.log(d);
        expect(pipe.transform(d)).toEqual('Sept 2, 2:00');
    });

    it('returns empty for invalid inputs', () => {
        expect(pipe.transform(undefined)).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform({ isDate: false } as any)).toEqual('');
        expect(pipe.transform('' as any)).toEqual('');
    });
});
