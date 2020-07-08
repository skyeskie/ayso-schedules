import { async, TestBed } from '@angular/core/testing';

import { LocalStorageWeeksService, LOCAL_STORAGE_WEEK_CACHE_PROVIDER } from '../../src/dao/ls/weeks.ls.service';
import { IBackend, StaticInitializationService } from '../../src/service/backend/static.backend';
import { LS_KEYS } from '../../src/service/local-storage.interface';
import { weekCacheInterfaceSpec } from '../interfaces/week-cache.spec.i';
import { ILocalStorage, MOCK_LOCAL_STORAGE_PROVIDER } from '../mocks/local-storage.mock';

let dao: LocalStorageWeeksService;
let lsMock: ILocalStorage;
let init: StaticInitializationService;

describe('DAO: LocalStorageWeekCache', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocalStorageWeeksService,
                LOCAL_STORAGE_WEEK_CACHE_PROVIDER,
                StaticInitializationService,
                { provide: IBackend, useExisting: StaticInitializationService },
                MOCK_LOCAL_STORAGE_PROVIDER,
            ],
        });

        dao = TestBed.inject(LocalStorageWeeksService);
        lsMock = TestBed.inject<ILocalStorage>(ILocalStorage);
        init = TestBed.inject(StaticInitializationService);
    });

    weekCacheInterfaceSpec();

    describe('(ls)', () => {
        it('parses saved weeks from LocalStorage', async(() => {
            lsMock.setItem(LS_KEYS.WEEKS_CACHE, init.weeksSaved);
            return init.getWeekStarts().then((weeks: Date[]) => {
                expect(weeks.length).toBeGreaterThan(1);
                expect(weeks.length).toEqual(init.weeks.length);
                for (let i = 0; i < weeks.length; ++ i) {
                    expect(weeks[i]).toEqual(init.weeks[i]);
                }
            });
        }));

        // TODO: Store as UTC
        xit('saves weeks to LocalStorage', async(() => {
            return init.getWeekStarts().then((weeks: Date[]) => {
                dao.init(weeks);
                return weeks;
            }).then(() => {
                console.log(LS_KEYS.WEEKS_CACHE);
                expect(lsMock.getItem(LS_KEYS.WEEKS_CACHE)).toEqual(init.weeksSaved);
            });
        }));
    });
});
