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

import FavoritesListView from '../../src/views/favorites-list';
import {TitleBarComponent} from '../../src/comp/title-bar.component';
import TwoTeamsGamesListComponent from '../../src/comp/games2-list.component';

describe('View: FavoritesList', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        FavoritesListView,
    ]);

    ensureViewExists(FavoritesListView, (tcb:TestComponentBuilder) => {
        return tcb.overrideDirective(FavoritesListView, TitleBarComponent, MockComponent)
                  .overrideDirective(FavoritesListView, TwoTeamsGamesListComponent, MockComponent);
    });
});
