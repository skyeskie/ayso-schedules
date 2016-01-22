import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'ayso-app',
    directives: [RouterLink],
    template: `
<div id="home" data-role="page">
    <img src="img/MainLogo.png" alt="AYSO Kansas" />
    <div class="main-buttons">
        <a [routerLink]="['/SchedulesMenu']" data-role="button">Schedules</a>
        <a [routerLink]="['/RegionList']" data-role="button">Region Info</a>
        <a [routerLink]="['/FavoritesSchedule']" data-role="button">My teams</a>
        <a [routerLink]="['/TwitterView']" data-role="button">Cancellations</a>
        <a [routerLink]="['/Settings']" data-role="button">Settings</a>
    </div>
</div>
    `
})
export class HomeView {
    constructor(
        private _router:Router,
        private _routeParams:RouteParams
    ) {}
}
