import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Game, GamesDAO, GamesInterface } from '../dao/games.interface';
import { SettingsDAO, SettingsInterface } from '../dao/settings.interface';
import { ITeamsDAO, Team, TeamsDAO } from '../dao/teams.interface';

@Component({
    styles: ['h4.card-text { display: inline; }'],
    template: `
    <title-bar></title-bar>
    <article class="container">
        <div class="card">
            <div class="card-block clearfix">
                <button class="btn btn-xs btn-primary-outline pull-xs-right"
                     type="button" (click)="toggleTeamSave()">
                    <nmi-icon>star_outline</nmi-icon>
                     {{getSavedToggleText()}}
                </button>
                <h5 class="text-sm-center card-text text-muted"><small>Team {{teamID}}</small></h5>
            </div>
            <div class="clearfix" *ngIf="!isCoachTBD()">
                <div class="text-sm-center text-md-left container">
                    <h5 class="col-xs-4 text-xs-right font-weight-bold">Coach</h5>
                    <h5 class="col-xs-8 text-xs-left">{{team?.coach | NameSwitch}}</h5>
                </div>
                <div class="col-xs-8 col-xs-offset-4">
                    <a type="button" class="btn btn-sm btn-link" href="tel:{{team.coachTel}}" *ngIf="team?.coachTel">
                        <nmi-icon>call</nmi-icon>{{team.coachTel}}
                    </a>
                </div>
            </div>
            <div class="clearfix" *ngIf="isCoachTBD()">
                <h5 class="col-xs-4 text-xs-right font-weight-bold">Coach</h5>
                <h5 class="col-xs-8 text-xs-left text-muted font-italic">
                    <small>To Be Determined</small>
                </h5>
            </div>
        </div>

        <div class="card">
            <single-team-game-list [games]="games" [team]="teamID"></single-team-game-list>
        </div>

    </article>
  `,
})
class TeamScheduleView implements OnInit {
    public isTeamSaved: boolean = false;
    public teamID: string;
    public games: Game[];
    public team: Team;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        @Inject(TeamsDAO)
        private teamsDao: ITeamsDAO,
        @Inject(GamesDAO)
        private gamesDAO: GamesInterface,
        @Inject(SettingsDAO)
        private settings: SettingsInterface,
    ) {
        // In OnInit
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(this.onLoadParams);
    }

    onLoadParams(paramMap: ParamMap): void {
        this.teamID = paramMap.get('id');
        this.teamsDao.getTeam(this.teamID).then((team: Team) => this.team = team);
        this.gamesDAO.findForTeam(this.teamID).then((list: Game[]) => this.games = list);
        this.settings.isTeamSaved(this.teamID).then((v: boolean) => this.isTeamSaved = v);
    }

    initCall(): void {
        console.log('tel:' + this.team.coachTel);
    }

    toggleTeamSave(): void {
        if (this.isTeamSaved) {
            this.settings.unSaveTeam(this.teamID);
        } else {
            this.settings.saveTeam(this.teamID);
        }
        this.isTeamSaved = ! this.isTeamSaved;
    }

    getSavedToggleText(): string {
        return (this.isTeamSaved) ? 'Unsave' : 'Save';
    }

    isCoachTBD(): boolean {
        return (this.team instanceof Team) && this.team.coach === 'TBD';
    }
}

export { TeamScheduleView as default, TeamScheduleView };
