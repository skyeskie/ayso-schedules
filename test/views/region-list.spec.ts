import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionListView } from '../../src/views/region-list';
import { MockRouterLink } from '../mocks/RouterLink';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: RegionList', () => {
    let component: RegionListView;
    let fixture: ComponentFixture<RegionListView>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockRouterLink,
                RegionListView,
                TitleBarMock,
            ], // ngFor
            providers: [],
        });

        fixture = TestBed.createComponent(RegionListView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
