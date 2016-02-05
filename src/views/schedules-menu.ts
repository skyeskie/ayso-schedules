import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {TitleBarComponent} from '../comp/title-bar';

@Component({
    directives: [RouterLink, TitleBarComponent],
    template: `
    <title-bar></title-bar>
    <div id="schedules" data-role="page" class="page">
        <img src="img/MainLogo.png" alt="AYSO Kansas" />
        <div class="main-buttons">
            <a [routerLink]="['CurWeekSchedule']" data-role="button">This Week</a>
            <a [routerLink]="['TeamSelect']" data-role="button">Find Team</a>
            <a [routerLink]="['DivisionSelect']" data-role="button">Advanced Query</a>
            <a [routerLink]="['FavoritesSchedule']" data-role="button">My teams</a>
        </div>
    </div>
    `
})
class SchedulesMenuView {
}

export { SchedulesMenuView as default, SchedulesMenuView };
