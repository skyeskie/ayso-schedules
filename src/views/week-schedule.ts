import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Game, GamesDAO, GamesInterface } from '../dao/games.interface';
import { SettingsDAO, SettingsInterface } from '../dao/settings.interface';
import { WeekCacheDAO, WeekCacheInterface } from '../dao/week-cache.interface';

@Component({
    template: `
    <title-bar></title-bar>
    <week-bar [week]="week" (weekChange)="navWeek($event)"></week-bar>
    <two-teams-game-list [games]="games" *ngIf="games"></two-teams-game-list>
    `,
})
class WeekScheduleView implements OnInit {
    public week: number;
    public games: Game[];
    public region: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        @Inject(GamesDAO)
        private gamesDAO: GamesInterface,
        @Inject(SettingsDAO)
        private settings: SettingsInterface,
        @Inject(WeekCacheDAO)
        private weekCache: WeekCacheInterface,
    ) {
        // No-op
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.week = parseInt(params.num, 10);
            if (isNaN(this.week)) {
                this.week = this.weekCache.getCurrentWeek() || 1;
            }

            this.settings.getRegionNumber()
                .then((num: number) => this.region = num)
                .then(() => this.gamesDAO.findByWeek(this.week, this.region))
                .then((res: Game[]) => this.games = res);
        });
    }

    navWeek(week: number): void {
        this.router.navigate(['/week', {num: week}]);
    }
}

export { WeekScheduleView as default, WeekScheduleView };
