import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";

@Component({
    selector: 'ayso-app',
    template: `
<div id="home" data-role="page">
    <img src="img/MainLogo.png" alt="AYSO Kansas" />
    <div class="main-buttons">
        <a [routerLink]="['/schedules']" data-role="button">Schedules</a>
        <a [routerLink]="['/regions']" data-role="button">Region Info</a>
        <a [routerLink]="['/favorites']" data-role="button">My teams</a>
        <a [routerLink]="['/twitter']" data-role="button">Cancellations</a>
        <a [routerLink]="['/settings']" data-role="button">Settings</a>
    </div>
</div>
    `
})
export class HomeComponent {
    constructor(
        private _router:Router,
        private _routeParams:RouteParams
    ) {}
}
