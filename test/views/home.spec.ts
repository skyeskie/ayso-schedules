import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';

import { HomeView } from '../../src/views/home';
import { MockRouterLink } from '../mocks/RouterLink';

describe('View: Home', () => {
    let component: HomeView;
    let fixture: ComponentFixture<HomeView>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeView],
            providers: [
                { provide: RouterLink, useClass: MockRouterLink },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
