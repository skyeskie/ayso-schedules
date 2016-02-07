import {
    describe,
} from 'angular2/testing';
import {settingsInterfaceSpec} from '../interfaces/settings.spec.i';
import MockSettingsService from '../../src/dao/mock/MockSettingsService';


describe('DAO: SettingsMock', () => {
    settingsInterfaceSpec(MockSettingsService);
});
