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

import Team from '../../src/models/team';
import {TeamsDAO} from '../../src/dao/teams.interface';

function teamsInterfaceSpec(impl: any) {
    describe('interface tests', () => {
        beforeEachProviders(() => [impl]);

        describe('getTeam', () => {
            it('returns promise of team', injectAsync([impl], (dao:TeamsDAO) => {
                console.log(dao);
                let p = dao.getTeam('A').then((team: Team) => {
                    console.log(team);
                    expect(team.code).toEqual('A');
                });
                expect(p).toBePromise();
                return p;
            }));

            it('throws on invalid lookup', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.getTeam('InvalidTeamId').then((team: Team) => {
                    fail('Should not return successfully');
                }, (err) => {
                    expect(err).toImplement(RangeError);
                });
            }));
        });

        describe('getTeams', () => {
            it('returns list of teams', injectAsync([impl], (dao:TeamsDAO) => {
                return dao.getTeams(['C', 'A']).then((teams: Team[]) => {
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
                return dao.getTeams(['Z', 'Q', 'A']).then((teams: Team[]) => {
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
