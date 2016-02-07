import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';
import {HomeView} from '../../src/views/home';
import {provide} from 'angular2/core';
import {RouterLink, MockRouterLink} from '../mocks/RouterLink';

describe('HomeView', () => {

    xit('should have routes defined for all links', () => {
        //expect(view).toContainText("Settings");
        //expect(view.innerText.toContain("Schedules"));
    });

    it('has a defined rendering', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb
            .overrideDirective(HomeView, RouterLink, MockRouterLink)
            .createAsync(HomeView).then((f) => {
                f.detectChanges();
                expect(f.nativeElement).toBeDefined();
            });
    }));

    //Could implement generic tests -> ALT text for all images, etc
});
