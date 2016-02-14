import {
    describe,
    beforeEach,
    beforeEachProviders,
    it,
    inject,
    injectAsync,
    TestComponentBuilder,
} from 'angular2/testing';
import Game from '../../src/models/game';

describe('Model: Game', () => {
    it('can recognize a home bye', () => {
        let homeBye = new Game('id', 'home', Game.BYE_TEAM, 1, new Date(), 10, 'field');
        expect(homeBye.isBye()).toBe(true);
    });

    it('can recognize an away bye', () => {
        let homeBye = new Game('id', Game.BYE_TEAM, 'away', 1, new Date(), 10, 'field');
        expect(homeBye.isBye()).toBe(true);
    });

    it('returns no bye when two teams', () => {
        let noBye = new Game('id', 'home', 'away', 1, new Date(), 10, 'field');
        expect(noBye.isBye()).toBe(false);
    });

    it('can return an opponent', () => {
        let game = new Game('id', 'home', 'away', 1, new Date(), 10, 'field');
        expect(game.getOpponent('home')).toEqual('away');
        expect(game.getOpponent('away')).toEqual('home');
    });

    it('returns bye opponent', () => {
        let homeBye = new Game('id', 'home', Game.BYE_TEAM, 1, new Date(), 10, 'field');
        expect(homeBye.getTeamWithBye()).toEqual('home');
    });

    it('throws error when finding opponent for team not playing', () => {
        let game = new Game('id', 'home', 'away', 1, new Date(), 10, 'field');
        expect(() => { game.getOpponent('foo'); }).toThrowError(RangeError);
    });

    it('throws error when getting bye team and no bye', () => {
        let game = new Game('id', 'home', 'away', 1, new Date(), 10, 'field');
        expect(() => { game.getTeamWithBye(); }).toThrowError(RangeError);
    });
});
