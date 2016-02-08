import {provide, Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import AYSO_APP_ROUTES from './routes';

import {MockTeamsService, TeamsDAO} from '../dao/mock/MockTeamsService';
import {MockSettingsService, SettingsDAO} from '../dao/mock/MockSettingsService';
import {MockGamesService, GamesDAO} from '../dao/mock/MockGamesService';
import {MockWeekCacheService, WeekCacheInterface} from '../dao/mock/MockWeekCacheService';
import {DataControlService} from '../dao/data-control.service';
import {CanActivate} from 'angular2/router';
import {OnActivate} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector: 'ayso-app',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        DataControlService,
        MockTeamsService,
        provide(GamesDAO, { useClass: MockGamesService }),
        provide(TeamsDAO, { useClass: MockTeamsService }),
        provide(WeekCacheInterface, { useClass: MockWeekCacheService}),
        provide(SettingsDAO, { useClass: MockSettingsService })
    ],
    template: `
    <main>
      <router-outlet></router-outlet>
    </main>`
})
@RouteConfig(AYSO_APP_ROUTES)
@CanActivate((to,from) => {
    console.log(to);
    console.log(from);
    console.log(this);
    return true;
    //Looks like will need to override Router here:
    //https://github.com/angular/angular/blob/4f1f29d7d24ee24c5fdbf3838d602dde48b8e40f/modules/angular2/src/router/router.ts#L146-L182
})
class AppComponent {
    constructor(private router:Router) {
        router.subscribe(v => console.log(v));
    }
}


export { AppComponent, AppComponent as default }
