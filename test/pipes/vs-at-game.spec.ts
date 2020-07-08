import Game from '../../src/models/game';
import { VsAtGameFormatPipe } from '../../src/pipes/vs-at-game.pipe';

describe('Pipe: NameSwitch', () => {
    let pipe: VsAtGameFormatPipe;

    beforeEach(() => {
        pipe = new VsAtGameFormatPipe();
    });

    it('formats a bye properly', () => {
        const byeGame = new Game('1', 'A', Game.BYE_TEAM, 1, new Date(), 1, 'field');
        expect(pipe.transform(byeGame, 'A')).toEqual('BYE');
        const byeGame2 = new Game('1', Game.BYE_TEAM, 'A', 1, new Date(), 1, 'field');
        expect(pipe.transform(byeGame2, 'A')).toEqual('BYE');
    });

    it('displays "at" for away', () => {
        const away = new Game('1', 'OPP', 'SELF', 1, new Date(), 1, 'field');
        expect(pipe.transform(away, 'SELF')).toEqual('at OPP');
    });

    it('displays "vs" for home', () => {
        const away = new Game('1', 'SELF', 'OPP', 1, new Date(), 1, 'field');
        expect(pipe.transform(away, 'SELF')).toEqual('vs OPP');
    });

    it('returns empty if param team not present', () => {
        const game = new Game('1', 'A', 'B', 1, new Date(), 1, 'field');
        expect(pipe.transform(game, 'C')).toEqual('');
    });

    it('returns empty for invalid inputs', () => {
        expect(pipe.transform(undefined, null)).toEqual('');
        expect(pipe.transform(null, null)).toEqual('');
        expect(pipe.transform({ prop: false } as any, null)).toEqual('');
        expect(pipe.transform('' as any, null)).toEqual('');
    });
});
