import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesDAO, GamesInterface } from '../dao/games.interface';
import Game from '../models/game';

@Component({
    template: `
    <title-bar></title-bar>
    <article class="container">
        <h4 class="text-primary">Search Results</h4>
        <h5><span *ngIf="filters.region">Region {{filters.region}} </span> {{filters.age}} {{filters.gender}}</h5>
        <week-bar [week]="filters.week" (weekChange)="navWeek($event)"></week-bar>
        <two-teams-game-list [games]="games"></two-teams-game-list>
    </article>
    `,
})
export class SearchResultsView implements OnInit {
    // Only used for displaying filter
    public filters: {week?: number, region?: number, gender?: string, age?: string} = {};

    public games: Game[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        @Inject(GamesDAO)
        private dao: GamesInterface,
    ) {
        // In OnInit
    }

    ngOnInit(): void {
        this.route.params.subscribe(this.handleParams);
    }

    private handleParams(params): void {
        const w = parseInt(params.get('week'), 10);
        if (!isNaN(w)) {
            this.filters.week = w;
        }
        const r = parseInt(params.get('region'), 10);
        if (!isNaN(r)) {
            this.filters.region = r;
        }
        this.filters.gender = params.get('gender');
        this.filters.age = params.get('age');

        this.dao.findGames(this.filters.region, this.filters.age, this.filters.gender, this.filters.week)
            .then((result: Game[]) => this.games = result);
    }

    navWeek(week: number): void {
        this.filters.week = week;
        this.router.navigate(['/DivisionSchedule', this.filters]);
    }
}
