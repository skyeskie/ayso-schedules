import {
    describe,
    beforeEach,
    beforeEachProviders,
    expect,
    it,
    inject,
    injectAsync,
    NgMatchers,
    TestComponentBuilder,
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import TwoTeamsGamesListComponent from '../../src/comp/games2-list.component';
import MockGamesService from '../../src/dao/mock/MockGamesService';
import Game from '../../src/models/game';

describe('Comp: WeekBar', () => {
    let gamesDao = new MockGamesService();

    @Component({
        template: `
            <two-teams-game-list [games]="gameList"></two-teams-game-list>
        `,
        directives: [TwoTeamsGamesListComponent],
    })
    class TestComponent {
        public gameList: Game[];
        TestComponent() {
            gamesDao.findByWeek(1).then(v => this.gameList = v);
        }
    }

    it("doesn't have tests", () => {
        expect(1+1).toBe(2);
    });
});
