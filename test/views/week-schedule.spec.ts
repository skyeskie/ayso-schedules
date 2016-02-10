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
import {ensureViewExists, asyncTcb} from '../util/viewUtil';

import {TitleBarComponent} from '../../src/comp/title-bar.component';
import TwoTeamsGamesListComponent from '../../src/comp/games2-list.component';
import {WeekScheduleView} from '../../src/views/week-schedule';

describe('View: TeamSchedule', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        WeekScheduleView,
    ]);

    ensureViewExists(WeekScheduleView, tcb => {
        return tcb.overrideDirective(WeekScheduleView, TitleBarComponent, MockComponent)
                  .overrideDirective(WeekScheduleView, TwoTeamsGamesListComponent, MockComponent);
    });
});
