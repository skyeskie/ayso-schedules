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
    MOCK_DAO_PROVIDERS, MOCK_ROUTER_PROVIDERS, Router, RouteParams, MockComponent
} from '../mocks/providers';
import {ensureViewExists} from '../util/viewUtil';

import FieldMapView from '../../src/views/field-map';
import {TitleBarComponent} from '../../src/comp/title-bar.component';

describe('View: FieldMap', () => {
    beforeEachProviders(() => [
        ...MOCK_DAO_PROVIDERS,
        provide(RouteParams, { useFactory: () => {
            let rp = new RouteParams({id: '49'});
            spyOn(rp, 'get').and.returnValue('49');
            return rp;
        },}),
        provide(FieldMapView, {useClass: FieldMapView, deps: [RouteParams]}),
    ]);

    ensureViewExists(FieldMapView, tcb => {
        return tcb.overrideDirective(FieldMapView, TitleBarComponent, MockComponent);
    });
});
