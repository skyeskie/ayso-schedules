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
import {IInitializationService} from '../../src/dao/init/initialization.interface';

function teamsInterfaceSpec(impl: any, init: any) {
    describe('(TeamsDAO)', () => {
        describe('getTeam', () => {
            it('resolves to a team', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.init().then(() => {
                    return dao.getTeam('A');
                }).then((team: Team) => {
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
            it('returns list of teams', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.init().then(() => {
                    return dao.getTeams(['C', 'A']);
                }).then((teams: Team[]) => {
                    expect(teams.length).toBe(2);
                    expect(teams.map(team => team.code).sort().join(',')).toEqual('A,C');
                });
            }));

            it('returns empty list for no games', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.init().then(() => {
                    return dao.getTeams([]);
                }).then((teams: Team[]) => {
                    expect(teams.length).toEqual(0);
                });
            }));

            it('ignores invalid teams on retrieve', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.init().then(() => {
                    return dao.getTeams(['Z', 'Q', 'A']);
                }).then((teams: Team[]) => {
                    expect(teams.length).toBe(1);
                    expect(teams[0].code).toEqual('A');
                });
            }));
        });

        xdescribe('findTeams');

        describe('clear', () => {
            it('returns a promise', inject([impl], (dao:TeamsDAO) => {
                expect(dao.clear()).toBePromise();
            }));
        });
    });
}

export {teamsInterfaceSpec as default, teamsInterfaceSpec}
