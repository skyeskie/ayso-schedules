import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchResultsView } from '../../src/views/search-results';
import { ActivatedRouteStub, ACTIVATED_ROUTE_STUB_PROVIDER } from '../mocks/activated-route-stub';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';
import { TitleBarMock } from '../mocks/title-bar.mock';

xdescribe('View: SearchResults', () => {
    let component: SearchResultsView;
    let fixture: ComponentFixture<SearchResultsView>;
    let route: ActivatedRouteStub;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchResultsView,
                TitleBarMock,
            ],
            providers: [
                ACTIVATED_ROUTE_STUB_PROVIDER,
                ...MOCK_DAO_PROVIDERS,
                {provide: Router, useValue: routerSpy},
            ],
        });

        route = TestBed.inject(ActivatedRouteStub);
        route.setParamMap({ week: '1', region: '49', gender: 'M', age: 'U12' });

        fixture = TestBed.createComponent(SearchResultsView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
