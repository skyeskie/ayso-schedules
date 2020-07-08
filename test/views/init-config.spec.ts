import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DataControlService } from '../../src/service/data-control.service';
import { InitialConfigurationView } from '../../src/views/init-config';
import { MOCK_LOCAL_STORAGE_PROVIDER } from '../mocks/local-storage.mock';
import { MOCK_DAO_PROVIDERS } from '../mocks/providers';

describe('View: InitConfig', () => {
    let component: InitialConfigurationView;
    let fixture: ComponentFixture<InitialConfigurationView>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InitialConfigurationView],
            providers: [
                ...MOCK_DAO_PROVIDERS,
                MOCK_LOCAL_STORAGE_PROVIDER,
                {provide: Router, useValue: routerSpy},
                DataControlService,
            ],
        });

        fixture = TestBed.createComponent(InitialConfigurationView);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
