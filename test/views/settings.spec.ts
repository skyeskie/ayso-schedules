import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataControlService } from '../../src/service/data-control.service';
import { SettingsView } from '../../src/views/settings';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: Settings', () => {
    let component: SettingsView;
    let fixture: ComponentFixture<SettingsView>;
    const settingsSpy = jasmine.createSpyObj(
        'SettingsDAO',
        ['getRegionNumber', 'setRegion'],
    );
    const dataControlSpy = jasmine.createSpyObj(
        'DataControlService',
        ['getLastUpdate', 'reset', 'update'],
        // ['settings'],
    );
    dataControlSpy.settings = settingsSpy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SettingsView,
                TitleBarMock,
            ],
            providers: [
                { provide: DataControlService, useValue: dataControlSpy },
            ],
        });

        settingsSpy.getRegionNumber.and.returnValue(Promise.resolve(49));

        fixture = TestBed.createComponent(SettingsView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
