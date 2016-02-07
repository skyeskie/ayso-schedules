import {Component, OnInit} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'title-bar',
    directives: [RouterLink],
    styles: ['nav { margin-bottom: 1em; }'],
    template: `
    <nav class="navbar navbar-dark bg-primary">
        <div class="nav navbar-nav">
            <!--<a class="nav-item nav-link" [routerLink]="['/Home']">Back</a>-->
            <a class="nav-item nav-link centered" [routerLink]="['/Home']">AYSO Kansas</a>
        </div>
    </nav>
    `
})
export class TitleBarComponent {}
