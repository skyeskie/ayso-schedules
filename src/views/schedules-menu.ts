import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar';

@Component({
    directives: [RouterLink, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <div class="main-buttons container">
        <img class="img-fluid center-block" src="/img/MainLogo.png" alt="AYSO Kansas" />
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['CurWeekSchedule']" data-role="button">This Week</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['TeamSelect']" data-role="button">Find Team</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['DivisionSelect']" data-role="button">Advanced Query</button>
        <button type="button" class="btn btn-secondary btn-block" [routerLink]="['FavoritesSchedule']" data-role="button">My teams</button>
    </div>
    `
})
class SchedulesMenuView {
}

export { SchedulesMenuView as default, SchedulesMenuView };
