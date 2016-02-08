import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {RouteConfig} from 'angular2/router';
import {SchedulesMenuView} from './schedules-menu';
import FavoritesListView from './favorites-list';
import RegionListView from './region-list';
import {CanActivate} from 'angular2/router';

@CanActivate((to,from) => {
    console.log('HomeView CanActivate');
    console.log(from);
    return true;
})
@Component({
    directives: [RouterLink],
    template: `
    <img class="img-fluid center-block" src="/img/MainLogo.png" alt="AYSO Kansas" />
    <article class="container main-buttons">
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['SchedulesMenu']">Schedules</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['RegionList']">Region Info</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['FavoritesSchedule']">My teams</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['TwitterView']">Cancellations</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['Settings']">Settings</button>
    </article>
    `
})
export class HomeView { }
