import {provide, enableProdMode} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
    enableProdMode();
} else {
    ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

import AppComponent from './app.component';
import {GamesDAO} from '../dao/games.interface';
import MockGamesService from '../dao/mock/MockGamesService';
import {TeamsDAO} from '../dao/teams.interface';
import MockTeamsService from '../dao/mock/MockTeamsService';
import {WeekCacheInterface} from '../dao/week-cache.interface';
import {MockWeekCacheService} from '../dao/mock/MockWeekCacheService';
import {SettingsDAO} from '../dao/settings.interface';
import MockSettingsService from '../dao/mock/MockSettingsService';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

document.addEventListener('DOMContentLoaded', function main() {
    bootstrap(AppComponent, [
        ...ENV_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...ANGULAR2_GOOGLE_MAPS_PROVIDERS,
        MockTeamsService,
        provide(GamesDAO, { useClass: MockGamesService }),
        provide(TeamsDAO, { useClass: MockTeamsService }),
        provide(WeekCacheInterface, { useClass: MockWeekCacheService}),
        provide(SettingsDAO, {
            useClass: MockSettingsService,
            deps: [MockTeamsService]
        })
    ])
     .catch(err => {});
});
