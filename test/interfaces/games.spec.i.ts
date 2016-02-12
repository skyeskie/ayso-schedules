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
import {IInitializationService} from '../../src/dao/init/initialization.interface';

function gamesInterfaceSpec(impl: any, init: any) {
    describe('(GamesDao)', () => {
        beforeEachProviders(() => [impl, provide(IInitializationService, {useValue: null})]);
        it('initializes with no initialization class', injectAsync([impl], (dao:GamesDAO) => {
            return dao.init().then(() => {
                return dao.findGames();
            }).then(games => {
                expect(games.length).toBe(0);
            });
        }));
    });

    describe('(GamesDao)', () => {
        beforeEachProviders(() => [impl, provide(IInitializationService, {useClass: init})]);

        describe('getGame', () => {
            it('resolves to a game', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.getGame('111');
                }).then((game) => {
                    expect(game).toBeAnInstanceOf(Game);
                    expect(game.id).toEqual('111');
                });
            }));

            it('rejects on invalid lookup', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => dao.getGame('InvalidGameId')).then((game) => {
                    fail('Should not return successfully');
                }, (err) => {
                    expect(err).toImplement(RangeError);
                });
            }));
        });

        describe('findByWeek', () => {
            it('returns games', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findByWeek(1);
                }).then((games) => {
                    expect(games.length).toBeGreaterThan(1);
                    games.forEach((game: Game) => {
                        expect(game.weekNum).toEqual(1);
                    });
                });
            }));

            it('returns empty list for no games', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findByWeek(999);
                }).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));
        });

        describe('findForTeam', () => {
            it('returns games', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findForTeam('A');
                }).then((games) => {
                    expect(games.length).toBeGreaterThan(1);
                    games.forEach(game => {
                        expect(game.hasTeam('A')).toBeTruthy();
                    });
                });
            }));

            it('returns empty list for no games', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findForTeam('NotATeam');
                }).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));
        });

        describe('findForTeams', () => {
            it('returns games for 1 team', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findForTeams(['B']);
                }).then((games) => {
                    expect(games.length).toBeGreaterThan(1);
                    games.forEach(game => {
                        expect(game.hasTeam('B')).toBeTruthy();
                    });
                });
            }));

            it('returns games for 3 teams', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findForTeams(['A','B','D']);
                }).then((games) => {
                    expect(games.length).toBeGreaterThan(1);
                    games.forEach(game => {
                        expect(game.hasTeam('A')
                            || game.hasTeam('B')
                            || game.hasTeam('D')).toBeTruthy();
                    });
                });
            }));

            it('returns empty list no teams', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findForTeams([]);
                }).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));

            it('returns ignores invalid teams', injectAsync([impl], (dao:GamesDAO) => {
                return dao.init().then(() => {
                    return dao.findForTeams(['NotATeam', 'StillNotATeam', 'C']);
                }).then((games) => {
                    expect(games.length).toBeGreaterThan(1);
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
