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
    xit
} from 'angular2/testing';
import Team from '../../src/models/team';
import {SettingsDAO} from '../../src/dao/settings.interface';
import Region from '../../src/models/region';
import MockTeamsService from '../../src/dao/mock/MockTeamsService';

function settingsInterfaceSpec(dao: any) {
    describe('interface tests', () => {
        beforeEachProviders(() => [
            dao,
            MockTeamsService
        ]);

        it('saves a team', injectAsync([dao], (dao) => {
            dao.clearSavedTeams();
            return dao.isTeamSaved('A').then((saved) => {
                expect(saved).toBeFalsy();
                dao.saveTeam('A');
                dao.isTeamSaved('A').then((saved) => {
                    expect(saved).toBeTruthy();
                    dao.saveTeam('C');
                    dao.unSaveTeam('A');
                    dao.isTeamSaved('A').then((saved) => {
                        expect(saved).toBeFalsy();
                    });
                });
            });
        }));

        it('returns saved teams', injectAsync([dao], (dao) => {
            return Promise.all([
                dao.getSavedTeamIDs(),
                dao.getSavedTeams()
            ]).then(vals => {
                let ids = new Set<String>(vals[0]);
                let teams = vals[1];
                teams.forEach((team: Team) => {
                    expect(ids.has(team.code)).toBeTruthy();
                });
            });
        }));

        it('saves region', injectAsync([dao], (dao: SettingsDAO) => {
            dao.setRegion(49);
            return Promise.all<any>([
                dao.getRegion(),
                dao.getRegionNumber()
            ]).then(vals => {
                let region: Region = vals[0];
                let number: Number = vals[1];
                expect(region.number).toEqual(number);
            })
        }));

        it('has a reset', inject([dao], dao => dao.reset()));
    });
}

export { settingsInterfaceSpec as default, settingsInterfaceSpec }
