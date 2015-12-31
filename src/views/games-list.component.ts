import {Component, OnInit} from "angular2/core";
@Component({
    selector: 'game',
    template: `
<div id="games-list" data-role="page" class="page">
    <div class="subheader ui-bar ui-bar-d">
        <h2></h2>
    </div>
    <div class="week-bar" data-role="header" data-theme="c">
        <a class="back" data-icon="arrow-l" data-iconpos="notext">Back</a>
        <h2>Week <span>#</span></h2>
        <a class="next" data-icon="arrow-r" data-iconpos="notext">Next</a>
    </div>

    <ul data-role="listview" data-theme="c">
        <li *ngFor="#game of games" (click)="onSelect(game)">
            {{game.code}}
        </li>
    </ul>
</div>
    `
})

export class GamesListComponent implements OnInit {
    public games: Game[];

    constructor(
        private _router: Router
    ) {}

    ngOnInit() {
        //TODO: populate games
    }

    onSelect(game: Game) {
        this._router.navigate(['GameDetail', {id: game.code}])
    }
}
