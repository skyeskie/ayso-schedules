import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar.component';
import {NgIf} from 'angular2/common';
import {SettingsDAO} from '../dao/settings.interface';
import {Inject} from 'angular2/core';

@Component({
    directives: [RouterLink, TitleBarComponent, NgIf],
    template: `
    <title-bar></title-bar>
    <article class="main-buttons container">
        <img class="img-fluid center-block m-b-2" src="img/HomeText.png" alt="AYSO Kansas" />
        <h2 *ngIf="regionNum">Region {{regionNum}} Schedules</h2>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['CurWeekSchedule']" data-role="button">This Week</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['TeamSelect']" data-role="button">Find Team</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['DivisionSelect']" data-role="button">Advanced Search</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['FavoritesSchedule']" data-role="button">My teams</button>
    </article>
    `,
})
class SchedulesMenuView {
    public regionNum:number;

    constructor(
        @Inject(SettingsDAO)
        dao:SettingsDAO
    ) {
        dao.getRegionNumber().then((n:number) => this.regionNum = n);
    }
}

export { SchedulesMenuView as default, SchedulesMenuView };
