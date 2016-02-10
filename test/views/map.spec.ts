import {provide} from 'angular2/core';
import {
    describe,
    beforeEachProviders,
    fdescribe,
    it,
    xdescribe,
    xit,
} from 'angular2/testing';

import {
    MOCK_DAO_PROVIDERS, MOCK_ROUTER_PROVIDERS, RouteParams, MockComponent
} from '../mocks/providers';
import {ensureViewExists} from '../util/viewUtil';

import {MapView} from '../../src/views/map';
import {TitleBarComponent} from '../../src/comp/title-bar.component';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

describe('View: Map', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        provide(RouteParams, { useFactory: () => {
            let rp = new RouteParams({id: '49'});
            spyOn(rp, 'get').and.returnValue('49');
            return rp;
        },}),
        provide(MapView, {useClass: MapView, deps: [RouteParams]}),
    ]);

    ensureViewExists(MapView, tcb => {
        return tcb.overrideDirective(MapView, TitleBarComponent, MockComponent)
                  .overrideDirective(MapView, ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MockComponent);
    });
});
