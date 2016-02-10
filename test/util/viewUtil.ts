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
import {GamesDAO, MockGamesService} from '../../src/dao/mock/MockGamesService';
import {TeamsDAO, MockTeamsService} from '../../src/dao/mock/MockTeamsService';
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
