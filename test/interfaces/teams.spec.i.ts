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
    xdescribe,
    xit,
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {TeamsDAO, Team} from '../../src/dao/teams.interface';
import {IBackend} from '../../src/dao/backend.interface';
import {StaticInitializationService} from '../../src/service/backend/static.backend';

let mockData = new StaticInitializationService();
function init(dao:TeamsDAO): Promise<any> {
    return mockData.getTeams().then((teams:Team[]) => {
        dao.add(teams);
        return teams;
    });
}

function teamsInterfaceSpec(impl: any) {
    describe('(TeamsDAO)', () => {
        describe('getTeam', () => {
            it('resolves to a team', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.getTeam('A')).then((team: Team) => {
                    expect(team.code).toEqual('A');
                });
            }));

            it('rejects on invalid lookup', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.getTeam('InvalidTeamId').then((team: Team) => {
                    fail('Should not return successfully');
                }, (err) => {
                    expect(err).toImplement(RangeError);
                });
            }));
        });

        describe('getTeams', () => {
            it('functions without an explicit init() call', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.getTeams(['C', 'A'])).then((teams: Team[]) => {
                    expect(teams.length).toBe(2);
                    expect(teams.map(team => team.code).sort().join(',')).toEqual('A,C');
                });
            }));

            it('returns list of teams', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.getTeams(['C', 'A'])).then((teams: Team[]) => {
                    expect(teams.length).toBe(2);
                    expect(teams.map(team => team.code).sort().join(',')).toEqual('A,C');
                });
            }));

            it('returns empty list for no games', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.getTeams([]).then((teams: Team[]) => {
                    expect(teams.length).toEqual(0);
                });
            }));

            it('ignores invalid teams on retrieve', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.getTeams(['Z', 'Q', 'A'])).then((teams: Team[]) => {
                    expect(teams.length).toBe(1);
                    expect(teams[0].code).toEqual('A');
                });
            }));
        });

        describe('findTeams', () => {
            it('filters on region', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.findTeams(49)).then((teams:Team[]) => {
                    expect(teams.length).toBeGreaterThan(1);
                    teams.forEach((team:Team) => expect(team.regionNumber).toBe(49));
                });
            }));

            it('filters on age', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.findTeams(null, 'U10')).then((teams:Team[]) => {
                    expect(teams.length).toBeGreaterThan(1);
                    teams.forEach((team:Team) =>
                        expect(team.division.age.toString()).toBe('U10')
                    );
                });
            }));

            it('filters on gender', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => dao.findTeams(null, null, 'Boys')).then((teams:Team[]) => {
                    expect(teams.length).toBeGreaterThan(1);
                    teams.forEach((team:Team) => expect(team.division.gender.short).toBe('B'));
                });
            }));

            it('returns all teams with null filters', injectAsync([impl], (dao:TeamsDAO) => {
                return init(dao).then(() => Promise.all([
                    dao.findTeams(null, null, null).then((teams:Team[]) => teams.length),
                    mockData.getTeams().then((teams:Team[]) => teams.length),
                ])).then((res) => {
                    expect(res[0]).toBeGreaterThan(0);
                    expect(res[0]).toBe(res[1]);
                });
            }));
        });

        describe('clear', () => {
            it('returns a promise', inject([impl], (dao:TeamsDAO) => {
                expect(dao.clear()).toBePromise();
            }));
        });
    });
}

export {teamsInterfaceSpec as default, teamsInterfaceSpec}
