import { Component } from '@angular/core';

@Component({
    template: `
    <article class="container main-buttons">
        <img class="center-block" style="width: 80%;" src="./img/KansasSoccerBall.svg" alt="AYSO Kansas" />
        <img class="img-fluid mb-1" src="./img/AYSOKansas.svg" alt="AYSO Kansas" />
        <button type="button" class="btn btn-secondary btn-block" routerLink="/schedules">
            <nmi-icon>event_note</nmi-icon> Schedules</button>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/regions">
            <nmi-icon>map</nmi-icon> Region Info
        </button>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/favorites">
            <nmi-icon>group</nmi-icon> My teams
        </button>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/twitter">
            <nmi-icon>update</nmi-icon> Cancellations
        </button>
        <button type="button" class="btn btn-secondary btn-block" routerLink="/settings">
            <nmi-icon>settings</nmi-icon> Settings
        </button>
    </article>
    `,
})
export class HomeView {
    // HomeView
}
