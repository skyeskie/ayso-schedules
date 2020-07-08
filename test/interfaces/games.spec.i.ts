/* tslint:disable:no-any */

import { async, TestBed } from '@angular/core/testing';

import { CFG } from '../../src/app/cfg';
import { Game, GamesDAO, GamesInterface } from '../../src/dao/games.interface';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';

function init(dao: GamesInterface, mockData: IBackend): Promise<any> {
    return mockData.getGames().then((games: Game[]) => dao.add(games));
}

function gamesInterfaceSpec(): any {
    let backend: StaticInitializationService;
    let dao: GamesInterface;

    CFG.init();
    describe('(GamesDao)', () => {
        beforeEach(() => {
            backend = TestBed.inject<StaticInitializationService>(StaticInitializationService);
            dao = TestBed.inject<GamesInterface>(GamesDAO);
        });

        describe('getGame', () => {
            it('resolves to a game', async(() => {
                return init(dao, backend).then(() => dao.getGame('111')).then((game) => {
                    expect(game).toBeObject();
                    expect(game.id).toEqual('111');
                });
            }));

            it('rejects on invalid lookup', async(() => {
                expectAsync(dao.getGame('InvalidGameId')).toBeRejected();
            }));
        });

        describe('findByWeek', () => {
            it('returns games', async(() => {
                return init(dao, backend).then(() => dao.findByWeek(1)).then((games) => {
                    expect(games).toBeArrayOfSize(8);
                    games.forEach((game: Game) => {
                        expect(game.weekNum).toEqual(1);
                    });
                });
            }));

            it('returns empty list for no games', async(() => {
                return dao.findByWeek(999).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));
        });

        describe('findGames', () => {
            it('filters on region', async(() => {
                return init(dao, backend).then(() => dao.findGames(49)).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(8);
                    games.forEach((game: Game) => expect(game.region).toEqual(49));
                });
            }));

            it('filters on age', async(() => {
                return init(dao, backend).then(() => dao.findGames(null, 'U10')).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(6);
                    games.forEach((game: Game) => expect(game.divis.age.toString()).toEqual('U10'));
                });
            }));

            it('filters on gender', async(() => {
                return init(dao, backend).then(() => dao.findGames(null, null, 'Boys')).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(6);
                    games.forEach((game: Game) => expect(game.divis.gender.short).toEqual('B'));
                });
            }));

            it('filters on week num', async(() => {
                return init(dao, backend).then(() => dao.findGames(null, null, null, 2)).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(4);
                    games.forEach((game: Game) => expect(game.weekNum).toEqual(2));
                });
            }));

            it('returns all games with null filters', async(() => {
                return init(dao, backend).then(() => Promise.all<number>([
                    dao.findGames().then((games: Game[]) => games.length),
                    dao.findGames(null, null, null, null).then((games: Game[]) => games.length),
                    backend.getGames().then((games: Game[]) => games.length),
                ])).then((res: number[]) => {
                    expect(res[0]).toBe(12);
                    expect(res[0]).toEqual(res[1]);
                    expect(res[0]).toEqual(res[2]);
                });
            }));
        });

        describe('findForTeam', () => {
            it('returns games', async(() => {
                return init(dao, backend).then(() => dao.findForTeam('A')).then((games) => {
                    expect(games).toBeArrayOfSize(3);
                    games.forEach(game => {
                        expect(game.hasTeam('A')).toBeTrue();
                    });
                });
            }));

            it('returns empty list for no games', async(() => {
                return dao.findForTeam('NotATeam').then((games) => {
                    expect(games).toBeEmptyArray();
                });
            }));
        });

        describe('findForTeams', () => {
            it('returns games for 1 team', async(() => {
                return init(dao, backend).then(() => dao.findForTeams(['B'])).then((games) => {
                    expect(games).toBeArrayOfSize(3);
                    games.forEach(game => {
                        expect(game.hasTeam('B')).toBeTrue();
                    });
                });
            }));

            it('returns games for 3 teams', async(() => {
                return init(dao, backend).then(() => dao.findForTeams(['A', 'B', 'D'])).then((games) => {
                    expect(games).toBeArrayOfSize(6);
                    games.forEach(game => {
                        expect(game.hasTeam('A')
                            || game.hasTeam('B')
                            || game.hasTeam('D')).toBeTrue();
                    });
                });
            }));

            it('returns empty list no teams', async(() => {
                return init(dao, backend).then(() => dao.findForTeams([])).then((games) => {
                    expect(games.length).toEqual(0);
                });
            }));

            it('returns ignores invalid teams', async(() => {
                return init(dao, backend).then(() => dao.findForTeams(['NotATeam', 'StillNotATeam', 'C']))
                                .then((games) => {
                                    expect(games).toBeArrayOfSize(3);
                                    games.forEach(game => {
                                        expect(game.hasTeam('C')).toBeTrue();
                                    });
                                });
            }));
        });

        describe('add', () => {
            it('adds a game', async(() => {
                const games = [ backend.games[0] ];
                return dao.add(games).then(() => dao.findGames()).then((daoGames: Game[]) => {
                    expect(daoGames).toBeArrayOfSize(1);
                    expect(daoGames[0]).toEqual(games[0]);
                });
            }));

            it('keeps existing games on add', async(() => {
                const game1: Game = backend.games[0];
                const game2: Game = backend.games[1];

                return dao.add([game1]).then(() => dao.findGames()).then((daoGames: Game[]) => {
                    expect(daoGames).toBeArrayOfSize(1);
                }).then(() => dao.add([game2])).then(() => dao.findGames()).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(2);
                });
            }));

            it('replaces games instead of adding duplicate IDs', async(() => {
                const game1: Game = backend.games[0];
                const game1b: Game = new Game(game1.id, game1.homeTeam, 'REPLACED',
                    game1.weekNum, game1.startTime, game1.region, game1.field, game1.divis);

                return dao.add([game1]).then(() => dao.findGames()).then((daoGames: Game[]) => {
                    expect(daoGames).toBeArrayOfSize(1);
                    expect(daoGames[0].awayTeam).toEqual(game1.awayTeam);
                }).then(() => dao.add([game1b])).then(() => dao.findGames()).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(1);
                    expect(games[0].awayTeam).toEqual('REPLACED');
                });
            }));

            it('can remove a game', async(() => {
                const addGame: Game = backend.games[0];
                const remGame: Game = new Game(addGame.id, null, null, null, null, null, null, null);

                return dao.add([addGame]).then(() => dao.findGames()).then((daoGames: Game[]) => {
                    expect(daoGames).toBeArrayOfSize(1);
                }).then(() => dao.add([remGame])).then(() => dao.findGames()).then((games: Game[]) => {
                    expect(games).toBeArrayOfSize(0);
                });
            }));
        });

        describe('clear()', () => {
            it('completes', async(() => {
                return dao.clear();
            }));
        });
    });
}

export { gamesInterfaceSpec, gamesInterfaceSpec as default };
