import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapView } from '../../src/views/map';
import { ActivatedRouteStub, ACTIVATED_ROUTE_STUB_PROVIDER } from '../mocks/activated-route-stub';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';
import { TitleBarMock } from '../mocks/title-bar.mock';

xdescribe('View: Map', () => {
    let component: MapView;
    let fixture: ComponentFixture<MapView>;
    let route: ActivatedRouteStub;

    @Component({selector: 'agm-map', template: ''})
    class MockAngularGoogleMaps {}

    @Component({selector: 'agm-marker', template: ''})
    class MockAgmMarker {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapView,
                MockAngularGoogleMaps,
                MockAgmMarker,
                TitleBarMock,
            ],
            providers: [
                ACTIVATED_ROUTE_STUB_PROVIDER,
                ...MOCK_DAO_PROVIDERS,
            ],
        });

        route = TestBed.inject(ActivatedRouteStub);
        route.setParamMap({ id: '49'});

        fixture = TestBed.createComponent(MapView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
