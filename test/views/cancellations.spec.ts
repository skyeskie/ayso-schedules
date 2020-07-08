import { ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;

import { TwitterWidgets } from '../../src/service/twitter';
import { CancellationsView } from '../../src/views/cancellations';
import { TitleBarMock } from '../mocks/title-bar.mock';

describe('View: Cancellations', () => {
    let component: CancellationsView;
    let fixture: ComponentFixture<CancellationsView>;
    const spy = createSpyObj('TwitterWidgets', ['load']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CancellationsView,
                TitleBarMock,
            ],
            providers: [
                { provide: TwitterWidgets, useSpy: spy },
            ],
        });

        fixture = TestBed.createComponent(CancellationsView);
        component = fixture.componentInstance;
        spy.load.and.returnValue(Promise);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
