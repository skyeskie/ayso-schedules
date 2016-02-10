import {
    describe,
    beforeEach,
    beforeEachProviders,
    fdescribe,
    FunctionWithParamTokens,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';

import {provide} from 'angular2/core';
import GameDetail from '../../src/views/game-detail';
import {GamesDAO, InMemoryGamesService} from '../../src/dao/mem/games.mem.service';
import {TeamsDAO, InMemoryTeamsService} from '../../src/dao/mem/teams.mem.service';
import {TitleBarComponent} from '../../src/comp/title-bar.component';
import {MOCK_ROUTER_PROVIDERS, MockComponent, RouteParams } from '../mocks/router';

function asyncTcb(component, fn: Function, tcbAdjustment=defaultTcbAdjust): FunctionWithParamTokens {
    return injectAsync([TestComponentBuilder], tcb => {
        return tcbAdjustment(tcb).createAsync(component).then(f => {
            fn.apply(f);
        });
    });
}

function defaultTcbAdjust(tcb:TestComponentBuilder):TestComponentBuilder {
    return tcb;
}

function ensureViewExists(component, tcbAdjustment=defaultTcbAdjust) {
    it('has a defined rendering', injectAsync([TestComponentBuilder], (tcb) => {
        return tcbAdjustment(tcb).createAsync(component).then(f => {
            f.detectChanges();
            expect(f.nativeElement).toBeDefined();
        });
    }));
}

export { ensureViewExists, asyncTcb };
