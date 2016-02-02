import {BrowserDomAdapter} from "angular2/src/platform/browser/browser_adapter";
BrowserDomAdapter.makeCurrent();

import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {MockRouterLink, RouterLink} from '../mocks/RouterLink';
import {HomeView} from '../../src/views/home';
import {TestComponentBuilder} from 'angular2/testing';

describe('HomeView', () => {
    it('has a defined rendering', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb
            .overrideDirective(HomeView, RouterLink, MockRouterLink)
            .createAsync(HomeView).then((f) => {
                f.detectChanges();
                expect(f.nativeElement).toBeDefined();
            });
    }));
});
