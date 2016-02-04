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
    xit
} from 'angular2/testing';

import Team from '../../src/models/team';

function teamsInterfaceSpec(dao: any) {
    describe('interface tests', () => {
        beforeEachProviders(() => [dao]);

        describe('getTeam', () => {
            it('returns promise of team', injectAsync([dao], (dao) => {
                console.log(dao);
                let p = dao.getTeam('A').then((team: Team) => {
                    console.log(team);
                    expect(team.code).toEqual('A');
                });
                expect(p).toBePromise();
                return p;
            }));

            it('throws on invalid lookup', injectAsync([dao], (dao) => {
                return dao.getTeam('InvalidTeamId').then((team: Team) => {
                    fail('Should not return successfully');
                }, (err) => {
                    expect(err).toImplement(RangeError);
                });
            }));
        });

        describe('getTeams', () => {
            it('returns list of teams', injectAsync([dao], (dao) => {
                return dao.getTeams(['C', 'A']).then((teams: Team[]) => {
                    expect(teams.length).toBe(2);
                    expect(teams.map(team => team.code).sort().join(',')).toEqual('A,C');
                });
            }));

            it('returns empty list for no games', injectAsync([dao], (dao) => {
                return dao.getTeams([]).then((teams: Team[]) => {
                    expect(teams.length).toEqual(0);
                });
            }));

            it('ignores invalid teams on retrieve', injectAsync([dao], (dao) => {
                return dao.getTeams(['Z', 'Q', 'A']).then((teams: Team[]) => {
                    expect(teams.length).toBe(1);
                    expect(teams[0].code).toEqual('A');
                });
            }));
        });

        xdescribe('findTeams', () => {

        });

        it('contains update/reset hooks', inject([dao], (dao) => {
            dao.reset();
            dao.update(false);
            dao.update(true);
        }));
    });
}

export {teamsInterfaceSpec as default, teamsInterfaceSpec}