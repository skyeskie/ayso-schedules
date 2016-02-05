import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    directives: [RouterLink],
    template: `
    <div id="schedules" data-role="page" class="page">
        <img src="img/MainLogo.png" alt="AYSO Kansas" />
        <div class="main-buttons">
            <a [routerlink]="['CurWeekSchedule']" data-role="button">This Week</a>
            <a [routerlink]="['TeamSelect']" data-role="button">Find Team</a>
            <a [routerlink]="['DivisionSelect']" data-role="button">Advanced Query</a>
            <a [routerlink]="['FavoritesSchedule']" data-role="button">My teams</a>
        </div>
    </div>
    `
})
class SchedulesMenuView {
}

export { SchedulesMenuView as default, SchedulesMenuView };
