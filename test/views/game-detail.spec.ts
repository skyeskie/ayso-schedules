import {
    describe,
    beforeEach,
    beforeEachProviders,
    fdescribe,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';
import {provide} from 'angular2/core';
import GameDetail from '../../src/views/game-detail';
import {GamesDAO, MockGamesService} from '../../src/dao/mock/MockGamesService';
import {TeamsDAO, MockTeamsService} from '../../src/dao/mock/MockTeamsService';
import {TitleBarComponent} from '../../src/comp/title-bar.component';
import {MOCK_ROUTER_PROVIDERS, MockComponent, RouteParams } from '../mocks/router';

describe('GameDetailView', () => {
    beforeEachProviders(() => [
        provide(TitleBarComponent, { useClass: MockComponent }),
        ...MOCK_ROUTER_PROVIDERS,

        provide(GamesDAO, {useClass: MockGamesService}),
        provide(TeamsDAO, {useClass: MockTeamsService}),
        provide(GameDetail, {deps: [RouteParams, GamesDAO, TeamsDAO]}),
    ]);

    it('has a defined rendering', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(GameDetail).then((f) => {
                      console.log(f);
                      f.detectChanges();
                      expect(f.nativeElement).toBeDefined();
                  });
    }));
});
