import {provide} from 'angular2/core';
import {
    describe,
    beforeEachProviders,
    fdescribe,
    it,
    TestComponentBuilder,
    xdescribe,
    xit,
} from 'angular2/testing';

import {
    MOCK_DAO_PROVIDERS, MOCK_ROUTER_PROVIDERS, MockComponent
} from '../mocks/providers';
import {ensureViewExists} from '../util/viewUtil';

import {TitleBarComponent} from '../../src/comp/title-bar.component';
import TwoTeamsGamesListComponent from '../../src/comp/games2-list.component';
import RegionListView from '../../src/views/region-list';

describe('View: RegionList', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        RegionListView,
    ]);

    ensureViewExists(RegionListView, (tcb:TestComponentBuilder) => {
        return tcb.overrideDirective(RegionListView, TitleBarComponent, MockComponent);
    });
});
