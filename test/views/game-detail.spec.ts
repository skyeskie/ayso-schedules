import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSwitchPipe } from '../../src/pipes/name-switch.pipe';
import { GameDetailView } from '../../src/views/game-detail';
import { ActivatedRouteStub, ACTIVATED_ROUTE_STUB_PROVIDER } from '../mocks/activated-route-stub';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';
import { MOCK_ROUTER_LINK_PROVIDER } from '../mocks/RouterLink';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: GameDetail', () => {
    let component: GameDetailView;
    let fixture: ComponentFixture<GameDetailView>;
    let route: ActivatedRouteStub;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameDetailView,
                TitleBarMock,
                NameSwitchPipe,
            ], // ngIf, [class.invisible], routerLink
            providers: [
                ACTIVATED_ROUTE_STUB_PROVIDER,
                MOCK_DAO_PROVIDERS, // Should really setup with spy...
                MOCK_ROUTER_LINK_PROVIDER,
            ],
        });

        route = TestBed.inject(ActivatedRouteStub);
        route.setParamMap({ id: '49'});

        fixture = TestBed.createComponent(GameDetailView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
