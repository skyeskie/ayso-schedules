import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekBarComponent } from '../../src/comp/week-bar.component';
import { IBackend } from '../../src/dao/backend.interface';
import { WeekCacheDAO, WeekCacheInterface } from '../../src/dao/week-cache.interface';
import { StaticInitializationService } from '../../src/service/backend/static.backend';
import { MOCK_WEEK_SERVICE_PROVIDER } from '../mocks/weeks.mock.service';

describe('Comp: WeekBar', () => {
    let fixture: ComponentFixture<WeekBarComponent>;
    let wbc: WeekBarComponent;
    let init: IBackend;
    let weekCache: WeekCacheInterface;
    let dElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                WeekBarComponent,
            ],
            providers: [
                { provide: IBackend, useClass: StaticInitializationService },
                MOCK_WEEK_SERVICE_PROVIDER,
            ],
        });
        fixture = TestBed.createComponent(WeekBarComponent);
        wbc = fixture.componentInstance;
        dElement = fixture.debugElement;
        init = TestBed.inject<IBackend>(IBackend);
        weekCache = TestBed.inject<WeekCacheInterface>(WeekCacheDAO);
    });

    it('should create', () => {
        expect(wbc).toBeTruthy();
    });

    it('shows the week number', async(() => {
        wbc.week = 2;
        wbc.ngOnInit();
        fixture.detectChanges();

        const elements = dElement.children[0].children;
        expect(elements.length).toEqual(3);
        expect(elements[0].nativeElement.textContent.trim()).toEqual('Back');
        expect(elements[1].nativeElement.textContent.trim()).toEqual('Week #2');
        expect(elements[2].nativeElement.textContent.trim()).toEqual('Next');
        expect(wbc.isFirstWeek()).toBeFalse('first week');
        expect(wbc.isLastWeek()).toBeFalse('last week');
    }));

    it('hides the back button on week one', async(() => {
        wbc.week = 1;
        wbc.ngOnInit();
        fixture.detectChanges();

        const elements = dElement.children[0].children;
        expect(elements.length).toEqual(3);
        expect(elements[0].nativeElement.classList.contains('invisible')).toBeTrue('first invisible');
        expect(wbc.isFirstWeek()).toBeTrue('first week');
        expect(wbc.isLastWeek()).toBeFalse('last week');
        }),
    );

    it('hides the forward button on the last week', async(() => {
        wbc.ngOnInit();
        wbc.week = wbc.max;
        fixture.detectChanges();

        const elements = dElement.children[0].children;
        expect(elements.length).toEqual(3);
        expect(elements[2].nativeElement.classList.contains('invisible')).toBeTrue('last invisible');
        expect(wbc.isFirstWeek()).toBeFalse('first week');
        expect(wbc.isLastWeek()).toBeTrue('last week');
    }));

    xit('hides both navigation buttons with only 1 week', async(() => {
        // TODO: Actually get 1 into component for both values
        wbc.week = 1;
        wbc.max = 1;
        fixture.detectChanges();

        const elements = dElement.children[0].children;
        expect(elements.length).toEqual(3);
        expect(wbc.max).toEqual(1, 'number of weeks');
        expect(elements[0].nativeElement.classList.contains('invisible')).toBeTrue('first invisible');
        expect(elements[1].nativeElement.textContent.trim()).toEqual('Week #1');
        expect(elements[2].nativeElement.classList.contains('invisible')).toBeTrue('last invisible');
        expect(wbc.isFirstWeek()).toBeTrue('first week');
        expect(wbc.isLastWeek()).toBeTrue('last week');
    }));

    // Can do this without rendering
    it('clips weeks below 1 to 1', async(() => {
        wbc.week = 0;
        wbc.ngOnInit();
        fixture.detectChanges();

        expect(wbc.week).toEqual(1);
    }));

    it('clips weeks above the max to the last week', async(() => {
        wbc.ngOnInit();
        wbc.week = wbc.max + 1;
        wbc.ngOnInit();

        expect(wbc.week).toEqual(wbc.max);
    }));

    xit('defaults to the current week if none specified');

    xit('emits change on click previous', () => {

    });

    xit('emits change on click previous', () => {

    });
});
