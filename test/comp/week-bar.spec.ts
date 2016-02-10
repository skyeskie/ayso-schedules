import {
    describe,
    beforeEach,
    beforeEachProviders,
    expect,
    fdescribe,
    it,
    inject,
    injectAsync,
    NgMatchers,
    TestComponentBuilder,
    xit,
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import WeekBarComponent from '../../src/comp/week-bar.component';
import MockWeekCacheService from '../../src/dao/mem/weeks.mem.service';
import {WeekCacheInterface} from '../../src/dao/week-cache.interface';

describe('Comp: WeekBar', () => {
    @Component({
        template: '',
        directives: [WeekBarComponent],
        providers: [
            provide(WeekCacheInterface, {useFactory: () => { return new MockWeekCacheService(); }})
        ],
    })
    class TestComponent {
    }

    it('shows the week number', injectAsync([TestComponentBuilder], (tcb) => {
        let wbc = new WeekBarComponent(new MockWeekCacheService());
        return tcb.overrideTemplate(TestComponent, `<week-bar week="3"></week-bar>`)
                  .createAsync(TestComponent).then((f) => {
                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children.length).toEqual(3);
                    expect(elements.children[0].innerText).toEqual('Back');
                    expect(elements.children[1].innerText).toEqual('Week #3');
                    expect(elements.children[2].innerText).toEqual('Next');
                    expect(wbc.showPrevious()).toBeTruthy();
                    expect(wbc.showNext()).toBeTruthy();
                });
                f.detectChanges();
            });
    }));
    it('hides the back button on week one', injectAsync([TestComponentBuilder], (tcb) => {
        let wbc = new WeekBarComponent(new MockWeekCacheService());
        return tcb.overrideTemplate(TestComponent, `<week-bar week="1"></week-bar>`)
                  .createAsync(TestComponent).then((f) => {
                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children.length).toEqual(2);
                    expect(elements.children[0].innerText).not.toEqual('Back');
                    expect(wbc.showPrevious()).toBeFalsy();
                    expect(wbc.showNext()).toBeTruthy();
                });
                f.detectChanges();
            });
    }));

    it('hides the forward button on the last week', injectAsync([TestComponentBuilder], (tcb) => {
        let wbc = new WeekBarComponent(new MockWeekCacheService());
        return tcb.overrideTemplate(TestComponent, `<week-bar week="7"></week-bar>`)
                  .createAsync(TestComponent).then((f) => {
                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children.length).toEqual(2);
                    expect(elements.children[1].innerText).not.toEqual('Forward');
                    console.log(wbc.toString());
                    expect(wbc.showPrevious()).toBeTruthy();
                    expect(wbc.showNext()).toBeFalsy();
                });
                f.detectChanges();
            });
    }));

    it('hides both navigation buttons with only 1 week', injectAsync([TestComponentBuilder], (tcb) => {
        let cache = new MockWeekCacheService();
        cache.max = 1;
        cache.cur = 1;

        let wbc = new WeekBarComponent(cache);
        return tcb.overrideTemplate(TestComponent, `<week-bar week="1"></week-bar>`)
                  .overrideProviders(TestComponent, [provide(WeekBarComponent, {useValue: cache})])
                  .createAsync(TestComponent).then((f) => {
                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children.length).toEqual(1);
                    expect(elements.children[0].innerText).toEqual('Week #1');
                    expect(wbc.showPrevious()).toBeFalsy();
                    expect(wbc.showNext()).toBeFalsy();
                });
                f.detectChanges();
            });
    }));

    //Can do this without rendering
    it('clips weeks below 1 to 1', injectAsync([TestComponentBuilder], (tcb) => {
        let wbc = new WeekBarComponent(new MockWeekCacheService());
        return tcb.overrideTemplate(TestComponent, `<week-bar week="-10"></week-bar>`)
                  .createAsync(TestComponent).then((f) => {
                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children[0].innerText).toEqual('Week #1');
                });
                f.detectChanges();
            });
    }));

    it('clips weeks above the max to the last week', injectAsync([TestComponentBuilder], (tcb) => {
        let wbc = new WeekBarComponent(new MockWeekCacheService());
        return tcb.overrideTemplate(TestComponent, `<week-bar week="42"></week-bar>`)
                  .createAsync(TestComponent).then((f) => {
                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children[0].innerText).toEqual('Week #7');
                });
                f.detectChanges();
            });
    }));

    //xit('defaults to the current week if none specified');
});
