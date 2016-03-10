import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {RouteConfig} from 'angular2/router';
import {SchedulesMenuView} from './schedules-menu';
import FavoritesListView from './favorites-list';
import RegionListView from './region-list';

@Component({
    directives: [RouterLink],
    template: `
    <img class="img-fluid center-block" src="./img/MainLogo.png" alt="AYSO Kansas" />
    <article class="container main-buttons">
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/SchedulesMenu']">
            <i class="ion-calendar"></i> Schedules</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/RegionList']">
            <i class="ion-map"></i> Region Info
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/FavoritesSchedule']">
            <i class="ion-bookmark"></i> My teams
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/TwitterView']">
            <i class="ion-social-twitter"></i> Cancellations
        </button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['/Settings']">
            <i class="ion-gear-a"></i> Settings
        </button>
    </article>
    `,
})
export class HomeView {
    //HomeView
}
