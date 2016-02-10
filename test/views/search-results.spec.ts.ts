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
    MOCK_DAO_PROVIDERS, MOCK_ROUTER_PROVIDERS, MockComponent
} from '../mocks/providers';
import {ensureViewExists} from '../util/viewUtil';

import {TitleBarComponent} from '../../src/comp/title-bar.component';
import TwoTeamsGamesListComponent from '../../src/comp/games2-list.component';
import {SearchResultsView} from '../../src/views/search-results';

describe('View: SearchResults', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        SearchResultsView,
    ]);

    ensureViewExists(SearchResultsView, tcb => {
        return tcb.overrideDirective(SearchResultsView, TitleBarComponent, MockComponent)
                  .overrideDirective(SearchResultsView, TwoTeamsGamesListComponent, MockComponent);
    });
});
