import {provide} from 'angular2/core';
import {
    describe,
    beforeEachProviders,
    fdescribe,
    it,
    xdescribe,
} from 'angular2/testing';
import {INTERCEPT_ROUTER_PROVIDER} from '../../src/comp/intercept-root-router';

describe('Utility: InterceptRootRouter', () => {
    beforeEachProviders(() => [
        INTERCEPT_ROUTER_PROVIDER
    ]);

    it("doesn't have tests", () => {
        expect(1+1).toBe(2);
    });
});
