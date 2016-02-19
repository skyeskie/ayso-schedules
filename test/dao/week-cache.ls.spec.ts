import {describe, beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';

import {weekCacheInterfaceSpec} from '../interfaces/week-cache.spec.i';
import {StaticInitializationService, IInitializationService} from '../../src/dao/init/static.init.service';
import {LocalStorageWeeksService} from '../../src/dao/ls/weeks.ls.service';
import {MockLocalStorage} from '../mocks/local-storage.mock';
import {ILocalStorage} from '../../src/dao/ls/settings.ls.service';

describe('DAO: LocalStorageWeekCache', () => {
    beforeEachProviders(() => [
        provide(IInitializationService, { useClass: StaticInitializationService }),
        provide(ILocalStorage, { useClass: MockLocalStorage }),
    ]);
    weekCacheInterfaceSpec(LocalStorageWeeksService, StaticInitializationService);
});
