import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'title-bar',
    directives: [RouterLink],
    template: `
    <div id="site-header">
        <div data-role="header" data-id="pageheader" class="pageheader" data-position="fixed">
            <a [routerLink]="['/Home']">Back</a>
            <a [routerLink]="['/Home']">AYSO Kansas</a>
        </div>
    </div>
    `
})
export class TitleBarComponent {}
