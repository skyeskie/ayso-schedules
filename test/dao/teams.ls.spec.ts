import {describe, beforeEachProviders, injectAsync, it} from 'angular2/testing';
import {provide} from 'angular2/core';

import {teamsInterfaceSpec} from '../interfaces/teams.spec.i';
import {StaticInitializationService, IBackend} from '../../src/dao/init/static.init.service';
import {LocalStorageTeamsService} from '../../src/dao/ls/teams.ls.service';
import {MOCK_LOCAL_STORAGE_PROVIDER, MockLocalStorage} from '../mocks/local-storage.mock';
import Team from '../../src/models/team';

describe('DAO: TeamsLocalStorage', () => {
    beforeEachProviders(() => [
        LocalStorageTeamsService,
        StaticInitializationService,
        provide(IBackend, {useExisting: StaticInitializationService}),
        MOCK_LOCAL_STORAGE_PROVIDER,
    ]);

    teamsInterfaceSpec(LocalStorageTeamsService);

    describe('(ls)', () => {
        beforeEachProviders(() => [
            StaticInitializationService,
            MockLocalStorage,
        ]);

        it('runs init with empty string saved', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init) => {
                mock.setItem('ayso-teams', '');
                spyOn(init, 'getTeams').and.callThrough();
                let dao = new LocalStorageTeamsService(mock);
                return init.getTeams().then((teams:Team[]) => {
                    dao.add(teams);
                }).then(() => dao.findTeams()).then((teams:Team[]) => {
                    expect(teams.length).toBeGreaterThan(0);
                    expect(init.getTeams).toHaveBeenCalled();
                });
            }
        ));

        it('parses saved teams from JSON', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init) => {
                mock.setItem('ayso-teams', init.teamsJSON);
                let dao = new LocalStorageTeamsService(mock);
                return dao.findTeams().then((teams:Team[]) => {
                    expect(teams.length).toEqual(init.teams.length);
                });
            }
        ));

        it('saves teams as JSON', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init:StaticInitializationService) => {
                let dao = new LocalStorageTeamsService(mock);
                return init.getTeams().then((teams:Team[]) => {
                    dao.add(teams);
                }).then(() => {
                    console.log(mock.getItem('ayso-teams'));
                    expect(mock.getItem('ayso-teams')).toEqual(init.teamsJSON);
                });
            }
        ));
    });
});
