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

import Team from '../../src/models/team';
import {SettingsDAO} from '../../src/dao/settings.interface';
import Region from '../../src/models/region';
import {IInitializationService} from '../../src/dao/init/initialization.interface';

function settingsInterfaceSpec(impl: any, init: any) {
    describe('(SettingsDAO)', () => {
        beforeEachProviders(() => [
            provide(IInitializationService, {useValue: null}),
            impl,
        ]);

        it('initializes with no initialization class', injectAsync([impl], (dao:SettingsDAO) => {
            return dao.init().then(() => {
                return dao.getSavedTeamIDs();
            }).then(teamIDs => {
                console.log(teamIDs);
                expect(teamIDs.length).toBe(0);
                return dao.getRegionNumber();
            }).then(regionNum => {
                expect(regionNum).not.toBeDefined();
            });
        }));
    });

    describe('(SettingsDAO)', () => {
        beforeEachProviders(() => [
            provide(IInitializationService, {useClass: init}),
            impl,
        ]);

        it('saves a team', injectAsync([impl], (dao:SettingsDAO) => {
            return dao.clearSavedTeams().then(() => {
                return dao.isTeamSaved('A');
            }).then(isSaved => {
                expect(isSaved).toBeFalsy();
                return dao.saveTeam('A');
            }).then(() => {
                return dao.isTeamSaved('A');
            }).then(isSaved => {
                expect(isSaved).toBeTruthy();
                return dao.saveTeam('A');
            });
        }));

        it('unsaves a team', injectAsync([impl], (dao:SettingsDAO) => {
            return dao.saveTeam('A').then(() => {
                return dao.isTeamSaved('A');
            }).then(isSaved => {
                expect(isSaved).toBeTruthy();
                return dao.unSaveTeam('A');
            }).then(() => {
                return dao.isTeamSaved('A');
            }).then(isSaved => {
                expect(isSaved).toBeFalsy();
            });
        }));

        it('returns saved teams', injectAsync([impl], (dao:SettingsDAO) => {
            let idSet = new Set<String>();

            return dao.init().then(() => {
                return dao.getSavedTeamIDs();
            }).then(teamIDs => {
                expect(teamIDs.length).toBeGreaterThan(1);
                teamIDs.forEach(id => idSet.add(id));
                return dao.getSavedTeams();
            }).then(teams => {
                teams.forEach((team: Team) => {
                    expect(idSet.has(team.code)).toBeTruthy();
                });
            });
        }));

        it('saves region', injectAsync([impl], (dao: SettingsDAO) => {
            return dao.setRegion(49).then(() => {
                return Promise.all<any>([
                    dao.getRegion(),
                    dao.getRegionNumber(),
                ]);
            }).then(values => {
                let region: Region = values[0];
                let number: Number = values[1];
                expect(number).toEqual(49);
                expect(region.number).toEqual(number);
            });
        }));

        describe('isAppConfigured', () => {
            it('is false on initial load', inject([impl], (dao:SettingsDAO) => {
                expect(dao.isAppConfigured()).toBeFalsy();
            }));

            it('is true when a region is present', injectAsync([impl], (dao:SettingsDAO) => {
                return dao.setRegion(49).then(() => {
                    expect(dao.isAppConfigured()).toBeTruthy();
                });
            }));

            it('is false after a reset', injectAsync([impl], (dao:SettingsDAO) => {
                return dao.setRegion(49).then(() => {
                    expect(dao.isAppConfigured()).toBeTruthy();
                    return dao.reset();
                }).then(() => {
                    expect(dao.isAppConfigured()).toBeFalsy();
                });
            }));
        });

        it('has no saved teams after reset', injectAsync([impl], (dao:SettingsDAO) => {
            return dao.init().then(() => {
                return dao.getSavedTeamIDs();
            }).then(teamIDs => {
                expect(teamIDs.length).toBeGreaterThan(0);
                return dao.reset();
            }).then(() => {
                return dao.getSavedTeamIDs();
            }).then(teamIDs => {
                expect(teamIDs.length).toBe(0);
            });
        }));
    });
}

export { settingsInterfaceSpec as default, settingsInterfaceSpec }
