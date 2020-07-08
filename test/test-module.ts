import { NgModule } from '@angular/core';
import { NgMatIconsModule } from 'ng-mat-icons';

import { MockRouterLink } from './mocks/RouterLink';
import { TitleBarMock } from './mocks/title-bar.mock';

// Dummy module so inspections will treat throwaway test components as having module
// TODO: Convert inspection settings ?
@NgModule({
    declarations: [
        MockRouterLink,
        MockRouterLink,
        TitleBarMock,
    ],
    imports: [
        NgMatIconsModule
    ]
})
// @ts-ignore (experimental decorators)
class TestModule { }
