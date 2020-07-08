import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IN_MEM_SETTINGS_PROVIDER, SettingsDAO } from '../../src/dao/mem/settings.mem.service';
import { IN_MEMORY_TEAMS_SERVICE_PROVIDER } from '../../src/dao/mem/teams.mem.service';
import { SettingsInterface } from '../../src/dao/settings.interface';
import { SchedulesMenuView } from '../../src/views/schedules-menu';
import { MockRouterLink } from '../mocks/RouterLink';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: SchedulesMenu', () => {
    let settings: SettingsInterface;
    let component: SchedulesMenuView;
    let fixture: ComponentFixture<SchedulesMenuView>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockRouterLink,
                SchedulesMenuView,
                TitleBarMock,
            ],
            providers: [
                IN_MEM_SETTINGS_PROVIDER,
                IN_MEMORY_TEAMS_SERVICE_PROVIDER,
            ],
        });

        settings = TestBed.inject<SettingsInterface>(SettingsDAO);
        settings.setRegion(49);

        fixture = TestBed.createComponent(SchedulesMenuView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
