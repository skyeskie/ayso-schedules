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
import Team from '../../src/models/team';
import {SettingsDAO} from '../../src/dao/settings.interface';
import Region from '../../src/models/region';

function settingsInterfaceSpec(impl: any, providers:any[] = []) {
    describe('interface tests', () => {
        it('saves a team', injectAsync([impl], (dao) => {
            dao.clearSavedTeams();
            return dao.isTeamSaved('A').then((saved) => {
                expect(saved).toBeFalsy();
                dao.saveTeam('A');
                dao.isTeamSaved('A').then((saved2) => {
                    expect(saved2).toBeTruthy();
                    dao.saveTeam('C');
                    dao.unSaveTeam('A');
                    dao.isTeamSaved('A').then((saved3) => {
                        expect(saved3).toBeFalsy();
                    });
                });
            });
        }));

        it('returns saved teams', injectAsync([impl], (dao) => {
            return Promise.all([
                dao.getSavedTeamIDs(),
                dao.getSavedTeams(),
            ]).then(values => {
                let ids = new Set<String>(values[0]);
                let teams = values[1];
                teams.forEach((team: Team) => {
                    expect(ids.has(team.code)).toBeTruthy();
                });
            });
        }));

        it('saves region', injectAsync([impl], (dao: SettingsDAO) => {
            dao.setRegion(49);
            return Promise.all<any>([
                dao.getRegion(),
                dao.getRegionNumber(),
            ]).then(values => {
                let region: Region = values[0];
                let number: Number = values[1];
                expect(region.number).toEqual(number);
            });
        }));

        it('is not configured on initial load', inject([impl], dao => {
            expect(dao.isAppConfigured()).toBeFalsy();
        }));

        it('has a reset', inject([impl], dao => dao.reset()));
    });
}

export { settingsInterfaceSpec as default, settingsInterfaceSpec }
