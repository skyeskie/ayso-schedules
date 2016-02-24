import {describe, it, fdescribe} from 'angular2/testing';
import {NameSwitchPipe} from '../../src/pipes/name-switch.pipe';

describe('Pipe: NameSwitch', () => {
    let pipe:NameSwitchPipe;

    beforeEach(() => {
        pipe = new NameSwitchPipe();
    });

    it('switches Last, First properly', () => {
        expect(pipe.transform('Last, First')).toEqual('First Last');
    });

    it('returns without comma untouched', () => {
        expect(pipe.transform('Last First')).toEqual('Last First');
    });

    it('returns input if there are multiple commas', () => {
        expect(pipe.transform('Last, First, Foo')).toEqual('Last, First, Foo');
    });

    it('returns empty for invalid inputs', () => {
        expect(pipe.transform(undefined)).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform(<any>{ prop: false })).toEqual('');
        expect(pipe.transform(<any>'')).toEqual('');
    });
});
