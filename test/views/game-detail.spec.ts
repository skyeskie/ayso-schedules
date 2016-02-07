import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {MockRouter, Router} from '../mocks/Router';
import {MockRouterLink, RouterLink} from '../mocks/RouterLink';
import GameDetail from '../../src/views/game-detail';
import {RouteParams} from 'angular2/router';
import MockGamesService from '../../src/dao/mock/MockGamesService';
import MockTeamsService from '../../src/dao/mock/MockTeamsService';

xdescribe('GameDetailView', () => {
    beforeEachProviders([
        GameDetail, { deps: [Router, RouteParams, MockGamesService, MockTeamsService]},
        provide(Router, { useClass: MockRouter }),
        provide(RouteParams, { useValue: { 'id': 1 }}),
        MockGamesService,
        MockTeamsService
    ]);

    it('has a defined rendering', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.createAsync(GameDetail).then((f) => {
                      console.log(f);
                      f.detectChanges();
                      expect(f.nativeElement).toBeDefined();
                  });
    }));
});
