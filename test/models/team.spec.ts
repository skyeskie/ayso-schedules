import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';
import Team from 'team';

describe('Model: Team', () => {
    it('can be constructed', () => {
        let t = new Team('code',  'coach', 'coachTel');
        expect(t.coach).toEqual('coach');
        expect(t.coachTel).toEqual('coachTel');
        expect(t.code).toEqual('code');
    });

    it('looks only at code for equals', () => {
        let t1 = new Team('1', 'foo', 'foo');
        let t2 = new Team('1', 'bar', 'bar');
        let t3 = new Team('2', 'foo', 'foo');

        expect(t1.equals(t2)).toBeTruthy();
        expect(t2.equals(t1)).toBeTruthy();
        expect(t1.equals(t3)).toBeFalsy();
        expect(t3.equals(t1)).toBeFalsy();
        expect(t1.equals(t1)).toBeTruthy();
    });
});
