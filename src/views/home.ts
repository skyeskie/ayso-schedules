import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    directives: [RouterLink],
    template: `
    <article class="container main-buttons">
        <img class="center-block" style="width: 80%;" src="./img/KansasSoccerBall.svg" alt="AYSO Kansas" />
        <img class="img-fluid m-b-1" src="./img/AYSOKansas.svg" alt="AYSO Kansas" />
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
