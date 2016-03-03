/* tslint:disable:no-any */
import {
    describe,
    beforeEach,
    beforeEachProviders,
    expect,
    fdescribe,
    it,
    inject,
    injectAsync,
    NgMatchers,
    TestComponentBuilder,
    xit,
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {GamesDAO, Game} from '../../src/dao/games.interface';
import {IBackend} from '../../src/dao/init/backend.interface.ts';
import {StaticInitializationService} from '../../src/dao/init/static.init.service';
import {CFG} from '../../src/app/cfg';

let mockData = new StaticInitializationService();
function init(dao:GamesDAO): Promise<any> {
    return mockData.getGames().then((games:Game[]) => {
        dao.add(games);
        return games;
    });
}

function gamesInterfaceSpec(impl: any) {
    console.log(CFG);
    describe('(GamesDao)', () => {
        describe('getGame', () => {
            it('resolves to a game', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.getGame('111')).then((game) => {
                    expect(game).toBeAnInstanceOf(Game);
                    expect(game.id).toEqual('111');
                });
            }));

            it('rejects on invalid lookup', injectAsync([impl], (dao:GamesDAO) => {
                return dao.getGame('InvalidGameId').then((game) => {
                    fail('Should not return successfully');
                }, (err) => {
                    expect(err).toImplement(RangeError);
                });
            }));
        });

        describe('findByWeek', () => {
            it('returns games', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findByWeek(1)).then((games) => {
                    expect(games.length).toBe(8);
                    games.forEach((game: Game) => {
                        expect(game.weekNum).toEqual(1);
                    });
                });
            }));

            it('returns empty list for no games', injectAsync([impl], (dao:GamesDAO) => {
                return dao.findByWeek(999).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));
        });

        describe('findGames', () => {
            it('filters on region', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findGames(49)).then((games:Game[]) => {
                    expect(games.length).toBe(8);
                    games.forEach((game:Game) => expect(game.region).toEqual(49));
                });
            }));

            it('filters on age', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findGames(null, 'U10')).then((games:Game[]) => {
                    expect(games.length).toBe(6);
                    games.forEach((game:Game) => expect(game.divis.age.toString()).toEqual('U10'));
                });
            }));

            it('filters on gender', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findGames(null, null, 'Boys')).then((games:Game[]) => {
                    expect(games.length).toBe(6);
                    games.forEach((game:Game) => expect(game.divis.gender.short).toEqual('B'));
                });
            }));

            it('filters on week num', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findGames(null, null, null, 2)).then((games:Game[]) => {
                    expect(games.length).toBe(4);
                    games.forEach((game:Game) => expect(game.weekNum).toEqual(2));
                });
            }));

            it('returns all games with null filters', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => Promise.all([
                    dao.findGames().then((games:Game[]) => games.length),
                    dao.findGames(null, null, null, null).then((games:Game[]) => games.length),
                    mockData.getGames().then((games:Game[]) => games.length),
                ])).then((res:number[]) => {
                    expect(res[0]).toBe(12);
                    expect(res[0]).toEqual(res[1]);
                    expect(res[0]).toEqual(res[2]);
                });
            }));
        });

        describe('findForTeam', () => {
            it('returns games', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findForTeam('A')).then((games) => {
                    expect(games.length).toBe(3);
                    games.forEach(game => {
                        expect(game.hasTeam('A')).toBeTruthy();
                    });
                });
            }));

            it('returns empty list for no games', injectAsync([impl], (dao:GamesDAO) => {
                return dao.findForTeam('NotATeam').then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));
        });

        describe('findForTeams', () => {
            it('returns games for 1 team', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findForTeams(['B'])).then((games) => {
                    expect(games.length).toBe(3);
                    games.forEach(game => {
                        expect(game.hasTeam('B')).toBeTruthy();
                    });
                });
            }));

            it('returns games for 3 teams', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findForTeams(['A','B','D'])).then((games) => {
                    expect(games.length).toBe(6);
                    games.forEach(game => {
                        expect(game.hasTeam('A')
                            || game.hasTeam('B')
                            || game.hasTeam('D')).toBeTruthy();
                    });
                });
            }));

            it('returns empty list no teams', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findForTeams([])).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));

            it('returns ignores invalid teams', injectAsync([impl], (dao:GamesDAO) => {
                return init(dao).then(() => dao.findForTeams(['NotATeam', 'StillNotATeam', 'C']))
                                .then((games) => {
                                    expect(games.length).toBe(3);
                                    games.forEach(game => {
                                        expect(game.hasTeam('C')).toBeTruthy();
                                    });
                                });
            }));
        });

        describe('clear()', () => {
            it('returns a promise', inject([impl], (dao:GamesDAO) => {
                expect(dao.clear()).toBePromise();
            }));
        });
    });
}

export {gamesInterfaceSpec, gamesInterfaceSpec as default}
