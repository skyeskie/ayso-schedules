import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NameSwitchPipe } from '../../src/pipes/name-switch.pipe';
import { TeamSelectView } from '../../src/views/team-select';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: Cancellations', () => {
    let component: TeamSelectView;
    let fixture: ComponentFixture<TeamSelectView>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                NameSwitchPipe,
                TeamSelectView,
                TitleBarMock,
            ],
            providers: [
                {provide: Router, useValue: routerSpy},
                ...MOCK_DAO_PROVIDERS,
            ],
        });

        fixture = TestBed.createComponent(TeamSelectView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
