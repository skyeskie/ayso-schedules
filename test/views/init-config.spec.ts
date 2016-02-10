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
import {DataControlService} from '../../src/dao/data-control.service';

describe('View: InitConfig', () => {
    beforeEachProviders(() => [
        ...MOCK_ROUTER_PROVIDERS,
        ...MOCK_DAO_PROVIDERS,
        DataControlService,
        InitialConfigurationView,
    ]);

    ensureViewExists(InitialConfigurationView);
});
