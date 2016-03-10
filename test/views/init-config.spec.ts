import {provide} from 'angular2/core';
import {
    describe,
    beforeEachProviders,
    fdescribe,
    it,
    xdescribe,
    xit,
} from 'angular2/testing';

import {
    MOCK_DAO_PROVIDERS, MOCK_ROUTER_PROVIDERS
} from '../mocks/providers';
import {ensureViewExists} from '../util/viewUtil';

import {InitialConfigurationView} from '../../src/views/init-config';
import {DataControlService} from '../../src/service/data-control.service';
import {MOCK_LOCAL_STORAGE_PROVIDER} from '../mocks/local-storage.mock';

describe('View: InitConfig', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        MOCK_LOCAL_STORAGE_PROVIDER,
        DataControlService,
        InitialConfigurationView,
    ]);

    ensureViewExists(InitialConfigurationView);
});
