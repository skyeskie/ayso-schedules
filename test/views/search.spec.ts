import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SearchView } from '../../src/views/search';
import { TitleBarMock } from '../mocks/title-bar.mock';
import { MOCK_WEEK_SERVICE_PROVIDER } from '../mocks/weeks.mock.service';

describe('View: Search', () => {
    let component: SearchView;
    let fixture: ComponentFixture<SearchView>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchView,
                TitleBarMock,
            ],
            providers: [
                { provide: Router, useValue: routerSpy },
                MOCK_WEEK_SERVICE_PROVIDER,
            ],
        });

        fixture = TestBed.createComponent(SearchView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
