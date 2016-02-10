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
import MockGamesService from '../../src/dao/mock/MockGamesService';
import Game from '../../src/models/game';
import SingleTeamGameListComponent from '../../src/comp/games1-list.component';

describe('Comp: WeekBar', () => {
    let gamesDao = new MockGamesService();

    @Component({
        template: `
            <single-team-game-list [games]="gameList" [team]="A"></single-team-game-list>
        `,
        directives: [SingleTeamGameListComponent],
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
