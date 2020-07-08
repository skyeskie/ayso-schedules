import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMapView } from '../../src/views/field-map';
import { ActivatedRouteStub, ACTIVATED_ROUTE_STUB_PROVIDER } from '../mocks/activated-route-stub';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: FieldMap', () => {
    let component: FieldMapView;
    let fixture: ComponentFixture<FieldMapView>;
    let route: ActivatedRouteStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FieldMapView,
                TitleBarMock,
            ],
            providers: [
                ACTIVATED_ROUTE_STUB_PROVIDER,
            ], // ngIf, [data],
        });

        route = TestBed.inject(ActivatedRouteStub);
        route.setParamMap({ id: '49'});

        fixture = TestBed.createComponent(FieldMapView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
