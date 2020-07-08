import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { WeekScheduleView } from '../../src/views/week-schedule';
import { ActivatedRouteStub, ACTIVATED_ROUTE_STUB_PROVIDER } from '../mocks/activated-route-stub';
import { TitleBarMock } from '../mocks/title-bar.mock';

xdescribe('View: WeekSchedule', () => {
    let component: WeekScheduleView;
    let fixture: ComponentFixture<WeekScheduleView>;
    let route: ActivatedRouteStub;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TitleBarMock,
                WeekScheduleView,
            ],
            providers: [
                ACTIVATED_ROUTE_STUB_PROVIDER,
                {provide: Router, useValue: routerSpy},
            ],
        });

        route = TestBed.inject(ActivatedRouteStub);
        route.setParamMap({ num: '2'});

        fixture = TestBed.createComponent(WeekScheduleView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
