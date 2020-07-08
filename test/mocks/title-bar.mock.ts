import { Component } from '@angular/core';

// Title bar with interactive parts and directives stripped
@Component({
    selector: 'title-bar',
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-primary">
        <div class="nav navbar-nav">
            <button type="button" class="nav-item nav-link btn btn-link">
                <nmi-icon>arrow_back</nmi-icon>
            </button>
            <button type="button" class="nav-item nav-link btn btn-link" routerLink="/">
                <nmi-icon>home</nmi-icon>
            </button>
            <p class="nav-item pull-xs-right m-y-0 m-x-1" style="padding:0.425rem; font-size: 16px !important;">Region {{region}}</p>
        </div>
    </nav>
    <div class="placeholder invisible" style="height: 3.5rem">&nbsp;</div>
    `,
})
// @ts-ignore (experimental decorators)
export class TitleBarMock {
    region: number = 49;
}
