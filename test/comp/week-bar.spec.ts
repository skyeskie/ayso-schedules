import {
    describe,
    beforeEach,
    beforeEachProviders,
    ComponentFixture,
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
import {WeekCacheInterface} from '../../src/dao/week-cache.interface';
import {IBackend} from '../../src/dao/init/backend.interface.ts';
import {StaticInitializationService} from '../../src/dao/init/static.init.service';
import {MockWeeksService} from '../mocks/weeks.mock.service';

let providers = [
    provide(IBackend, {useClass: StaticInitializationService}),
    provide(WeekCacheInterface, {useFactory: () => {
        return new MockWeeksService(2,7);
    },}),
];

describe('Comp: WeekBar', () => {
    @Component({
        template: '',
        directives: [WeekBarComponent],
        providers: providers,
    })
    class TestComponent {
    }

    beforeEachProviders(() => [...providers, WeekBarComponent]);

    it('shows the week number',
        injectAsync([TestComponentBuilder, WeekBarComponent], (tcb:TestComponentBuilder, wbc:WeekBarComponent) => {
            return tcb.overrideTemplate(TestComponent, `<week-bar week="3"></week-bar>`)
                      .createAsync(TestComponent).then((f:ComponentFixture) => {

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
    it('hides the back button on week one',
        injectAsync([TestComponentBuilder, WeekBarComponent], (tcb:TestComponentBuilder, wbc:WeekBarComponent) => {
            return tcb.overrideTemplate(TestComponent, `<week-bar week="1"></week-bar>`)
                      .createAsync(TestComponent).then((f:ComponentFixture) => {

                    wbc.onInit.subscribe(() => {
                        let elements = f.debugElement.nativeElement.children[0].children[0];
                        expect(elements.children.length).toEqual(2);
                        expect(elements.children[0].innerText).not.toEqual('Back');
                        expect(wbc.showPrevious()).toBeFalsy();
                        expect(wbc.showNext()).toBeTruthy();
                    });
                    f.detectChanges();
                });
        })
    );

    it('hides the forward button on the last week',
        injectAsync([TestComponentBuilder, WeekBarComponent], (tcb:TestComponentBuilder, wbc:WeekBarComponent) => {
        return tcb.overrideTemplate(TestComponent, `<week-bar week="7"></week-bar>`)
                  .createAsync(TestComponent).then((f:ComponentFixture) => {

                wbc.onInit.subscribe(() => {
                    let elements = f.debugElement.nativeElement.children[0].children[0];
                    expect(elements.children.length).toEqual(2);
                    expect(elements.children[1].innerText).not.toEqual('Forward');
                    expect(wbc.showPrevious()).toBeTruthy();
                    expect(wbc.showNext()).toBeFalsy();
                });
                f.detectChanges();
            });
    }));

    it('hides both navigation buttons with only 1 week',
        injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
            let cache = new MockWeeksService(1,1);
            let wbc = new WeekBarComponent(cache);
            return tcb.overrideTemplate(TestComponent, `<week-bar week="1"></week-bar>`)
                      .overrideProviders(TestComponent, [provide(WeekBarComponent, {useValue: cache})])
                      .createAsync(TestComponent).then((f:ComponentFixture) => {

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
    it('clips weeks below 1 to 1',
        injectAsync([TestComponentBuilder, WeekBarComponent], (tcb:TestComponentBuilder, wbc:WeekBarComponent) => {
            return tcb.overrideTemplate(TestComponent, `<week-bar week="-10"></week-bar>`)
                      .createAsync(TestComponent).then((f:ComponentFixture) => {

                    wbc.onInit.subscribe(() => {
                        let elements = f.debugElement.nativeElement.children[0].children[0];
                        expect(elements.children[0].innerText).toEqual('Week #1');
                    });
                    f.detectChanges();
                });
    }));

    it('clips weeks above the max to the last week',
        injectAsync([TestComponentBuilder, WeekBarComponent], (tcb:TestComponentBuilder, wbc:WeekBarComponent) => {
            return tcb.overrideTemplate(TestComponent, `<week-bar week="42"></week-bar>`)
                      .createAsync(TestComponent).then((f:ComponentFixture) => {

                    wbc.onInit.subscribe(() => {
                        let elements = f.debugElement.nativeElement.children[0].children[0];
                        expect(elements.children[0].innerText).toEqual('Week #7');
                    });
                    f.detectChanges();
                });
    }));

    //xit('defaults to the current week if none specified');
});
