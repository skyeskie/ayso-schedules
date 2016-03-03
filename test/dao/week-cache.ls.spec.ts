import {describe, beforeEachProviders, it, xit} from 'angular2/testing';
import {provide} from 'angular2/core';

import {weekCacheInterfaceSpec} from '../interfaces/week-cache.spec.i';
import {StaticInitializationService, IBackend} from '../../src/dao/init/static.init.service';
import {LocalStorageWeeksService} from '../../src/dao/ls/weeks.ls.service';
import {MOCK_LOCAL_STORAGE_PROVIDER} from '../mocks/local-storage.mock';
import {injectAsync} from 'angular2/testing';
import {MockLocalStorage} from '../mocks/local-storage.mock';
import {LS_KEYS} from '../../src/dao/ls/local-storage.interface';

describe('DAO: LocalStorageWeekCache', () => {
    beforeEachProviders(() => [
        provide(IBackend, { useClass: StaticInitializationService }),
        MOCK_LOCAL_STORAGE_PROVIDER,
    ]);
    weekCacheInterfaceSpec(LocalStorageWeeksService, StaticInitializationService);

    describe('(ls)', () => {
        beforeEachProviders(() => [
            StaticInitializationService,
            MockLocalStorage,
        ]);

        it('parses saved weeks from LocalStorage', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init:StaticInitializationService) => {
                mock.setItem(LS_KEYS.WEEKS_CACHE, init.weeksSaved);
                let dao = new LocalStorageWeeksService(mock);
                return init.getWeekStarts().then((weeks:Date[]) => {
                    expect(weeks.length).toBeGreaterThan(1);
                    expect(weeks.length).toEqual(init.weeks.length);
                    for(let i=0; i<weeks.length; ++ i) {
                        expect(weeks[i]).toEqual(init.weeks[i]);
                    }
                });
            }));

        it('saves weeks to LocalStorage', injectAsync([MockLocalStorage, StaticInitializationService],
            (mock:MockLocalStorage, init:StaticInitializationService) => {
                let dao = new LocalStorageWeeksService(mock);
                return init.getWeekStarts().then((weeks:Date[]) => {
                    dao.init(weeks);
                    return weeks;
                }).then(() => {
                    console.log(LS_KEYS.WEEKS_CACHE);
                    expect(mock.getItem(LS_KEYS.WEEKS_CACHE)).toEqual(init.weeksSaved);
                });
            }
        ));
    });
});
