import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesListView } from '../../src/views/favorites-list';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';
import { MOCK_ROUTER_LINK_PROVIDER } from '../mocks/RouterLink';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: FavoritesList', () => {
    let component: FavoritesListView;
    let fixture: ComponentFixture<FavoritesListView>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FavoritesListView,
                TitleBarMock,
            ], // ngIf, ngFor, routerLink,
            providers: [
                MOCK_DAO_PROVIDERS,
                MOCK_ROUTER_LINK_PROVIDER,
            ],
        });

        fixture = TestBed.createComponent(FavoritesListView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
