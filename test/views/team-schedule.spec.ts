import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { NameSwitchPipe } from '../../src/pipes/name-switch.pipe';
import { TeamScheduleView } from '../../src/views/team-schedule';
import { ActivatedRouteStub } from '../mocks/activated-route-stub';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: TeamSchedule', () => {
    let component: TeamScheduleView;
    let fixture: ComponentFixture<TeamScheduleView>;
    const route = new ActivatedRouteStub({ id: '1701B'});
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    @Component({selector: 'single-team-game-list', template: '', inputs: ['games', 'team']})
    class StubSingleTeamGameList {}

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NameSwitchPipe,
                StubSingleTeamGameList,
                TeamScheduleView,
                TitleBarMock,
            ],
            providers: [
                { provide: ActivatedRoute, useValue: route },
                ...MOCK_DAO_PROVIDERS,
                { provide: Router, useValue: routerSpy },
            ],
        });

        fixture = TestBed.createComponent(TeamScheduleView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
