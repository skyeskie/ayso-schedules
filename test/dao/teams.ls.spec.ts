import { async, TestBed } from '@angular/core/testing';

import { LocalStorageTeamsService, TeamsDAO } from '../../src/dao/ls/teams.ls.service';
import Team from '../../src/models/team';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { teamsInterfaceSpec } from '../interfaces/teams.spec.i';
import { ILocalStorage, MOCK_LOCAL_STORAGE_PROVIDER } from '../mocks/local-storage.mock';

let dao: LocalStorageTeamsService;
let lsMock: ILocalStorage;
let init: StaticInitializationService;

describe('DAO: TeamsLocalStorage', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocalStorageTeamsService,
                { provide: TeamsDAO, useExisting: LocalStorageTeamsService },
                StaticInitializationService,
                { provide: IBackend, useExisting: StaticInitializationService },
                MOCK_LOCAL_STORAGE_PROVIDER,
            ],
        });

        dao = TestBed.inject(LocalStorageTeamsService);
        lsMock = TestBed.inject<ILocalStorage>(ILocalStorage);
        init = TestBed.inject(StaticInitializationService);
    });

    teamsInterfaceSpec();

    describe('(ls)', () => {
        it('runs init with empty string saved', async(() => {
            lsMock.setItem('ayso-teams', '');
            spyOn(init, 'getTeams').and.callThrough();
            return init.getTeams().then((teams: Team[]) => {
                dao.add(teams);
            }).then(() => dao.findTeams()).then((teams: Team[]) => {
                expect(teams.length).toBeGreaterThan(0);
                expect(init.getTeams).toHaveBeenCalled();
            });
        }));

        it('parses saved teams from JSON', async(() => {
            lsMock.setItem('ayso-teams', init.teamsJSON);

            // Re-init
            const teamsDao = new LocalStorageTeamsService(lsMock);

            return teamsDao.findTeams().then((teams: Team[]) => {
                expect(teams.length).toEqual(init.teams.length);
            });
        }));

        it('saves teams as JSON', async(() => {
            return init.getTeams().then((teams: Team[]) => {
                dao.add(teams);
            }).then(() => {
                expect(lsMock.getItem('ayso-teams')).toEqual(init.teamsJSON);
            });
        }));
    });
});
