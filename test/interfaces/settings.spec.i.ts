/* tslint:disable:no-any */

import { async, TestBed } from '@angular/core/testing';

import { CFG } from '../../src/app/cfg';
import { IBackend } from '../../src/dao/backend.interface';
import { Region, SettingsDAO, SettingsInterface, Team } from '../../src/dao/settings.interface';

function init(dao: SettingsInterface, backend: IBackend): Promise<any> {
    return backend.getSettings().then((preset) => dao.init(preset));
}

function settingsInterfaceSpec(): any {
    let dao: SettingsInterface;
    let backend: IBackend;

    CFG.init();
    beforeEach(() => {
        dao = TestBed.inject<SettingsInterface>(SettingsDAO);
        backend = TestBed.inject<IBackend>(IBackend);
    });

    describe('(SettingsDAO)', () => {
        it('saves a team', async(() => {
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

        it('unsaves a team', async(() => {
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

        it('returns saved teams', async(() => {
            const idSet = new Set<string>();

            return init(dao, backend).then(() => dao.getSavedTeamIDs()).then(teamIDs => {
                expect(teamIDs.length).toBeGreaterThan(1);
                teamIDs.forEach(id => idSet.add(id));
                return dao.getSavedTeams();
            }).then(teams => {
                teams.forEach((team: Team) => {
                    expect(idSet.has(team.code)).toBeTruthy();
                });
            });
        }));

        it('saves region', async(() => {
            return dao.setRegion(49).then(() => {
                return Promise.all<any>([
                    dao.getRegion(),
                    dao.getRegionNumber(),
                ]);
            }).then(values => {
                const region: Region = values[0];
                const n: number = values[1];
                expect(n).toEqual(49);
                expect(region.number).toEqual(n);
            });
        }));

        describe('isAppConfigured', () => {
            it('is false on initial load', () => {
                expect(dao.isAppConfigured()).toBeFalsy();
            });

            it('is true when a region is present', async(() => {
                return dao.setRegion(49).then(() => {
                    expect(dao.isAppConfigured()).toBeTruthy();
                });
            }));

            it('is false after a reset', async(() => {
                return dao.setRegion(49).then(() => {
                    expect(dao.isAppConfigured()).toBeTruthy();
                    return dao.reset();
                }).then(() => {
                    expect(dao.isAppConfigured()).toBeFalsy();
                });
            }));
        });

        it('has no saved teams after reset', async(() => {
            return init(dao, backend).then(() => dao.getSavedTeamIDs())
                            .then(teamIDs => {
                                expect(teamIDs.length).toBeGreaterThan(0);
                                return dao.reset();
                            })
                            .then(() => dao.getSavedTeamIDs())
                            .then(teamIDs => expect(teamIDs.length).toBe(0));
        }));
    });
}

export { settingsInterfaceSpec as default, settingsInterfaceSpec };
