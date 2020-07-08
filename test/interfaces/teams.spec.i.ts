/* tslint:disable:no-any */
import { async, TestBed } from '@angular/core/testing';

import { IBackend } from '../../src/dao/backend.interface';
import { ITeamsDAO, Team, TeamsDAO } from '../../src/dao/teams.interface';

function init(dao: ITeamsDAO, data: IBackend): Promise<any> {
    return data.getTeams().then((teams: Team[]) => {
        dao.add(teams);
        return teams;
    });
}

function teamsInterfaceSpec(): any {
    describe('(TeamsDAO)', () => {
        let dao: ITeamsDAO;
        let data: IBackend;

        beforeEach(() => {
            dao = TestBed.inject<ITeamsDAO>(TeamsDAO);
            data = TestBed.inject<IBackend>(IBackend);
        });

        describe('getTeam', () => {
            it('resolves to a team', async(() => {
                return init(dao, data).then(() => dao.getTeam('A')).then((team: Team) => {
                    expect(team.code).toEqual('A');
                });
            }));

            it('rejects on invalid lookup', async(() => {
                return expectAsync(dao.getTeam('InvalidTeamId')).toBeRejected();
            }));
        });

        describe('getTeams', () => {
            it('functions without an explicit init() call', async(() => {
                return init(dao, data).then(() => dao.getTeams(['C', 'A'])).then((teams: Team[]) => {
                    expect(teams.length).toBe(2);
                    expect(teams.map(team => team.code).sort().join(',')).toEqual('A,C');
                });
            }));

            it('returns list of teams', async(() => {
                return init(dao, data).then(() => dao.getTeams(['C', 'A'])).then((teams: Team[]) => {
                    expect(teams.length).toBe(2);
                    expect(teams.map(team => team.code).sort().join(',')).toEqual('A,C');
                });
            }));

            it('returns empty list for no games', async(() => {
                return dao.getTeams([]).then((teams: Team[]) => {
                    expect(teams.length).toEqual(0);
                });
            }));

            it('ignores invalid teams on retrieve', async(() => {
                return init(dao, data).then(() => dao.getTeams(['Z', 'Q', 'A'])).then((teams: Team[]) => {
                    expect(teams.length).toBe(1);
                    expect(teams[0].code).toEqual('A');
                });
            }));
        });

        describe('findTeams', () => {
            it('filters on region', async(() => {
                return init(dao, data).then(() => dao.findTeams(49)).then((teams: Team[]) => {
                    expect(teams.length).toBeGreaterThan(1);
                    teams.forEach((team: Team) => expect(team.regionNumber).toBe(49));
                });
            }));

            it('filters on age', async(() => {
                return init(dao, data).then(() => dao.findTeams(null, 'U10')).then((teams: Team[]) => {
                    expect(teams.length).toBeGreaterThan(1);
                    teams.forEach((team: Team) =>
                        expect(team.division.age.toString()).toBe('U10'),
                    );
                });
            }));

            it('filters on gender', async(() => {
                return init(dao, data).then(() => dao.findTeams(null, null, 'Boys')).then((teams: Team[]) => {
                    expect(teams.length).toBeGreaterThan(1);
                    teams.forEach((team: Team) => expect(team.division.gender.short).toBe('B'));
                });
            }));

            it('returns all teams with null filters', async(() => {
                return init(dao, data).then(() => Promise.all([
                    dao.findTeams(null, null, null).then((teams: Team[]) => teams.length),
                    data.getTeams().then((teams: Team[]) => teams.length),
                ])).then((res) => {
                    expect(res[0]).toBeGreaterThan(0);
                    expect(res[0]).toBe(res[1]);
                });
            }));
        });

        describe('clear', () => {
            it('returns a promise', async(() => {
                return dao.clear();
            }));
        });
    });
}

export { teamsInterfaceSpec as default, teamsInterfaceSpec };
