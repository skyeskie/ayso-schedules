import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMatIconsModule } from 'ng-mat-icons';
import { MOCK_LOCAL_STORAGE_PROVIDER } from '../../test/mocks/local-storage.mock';

import { SingleTeamGameListComponent } from '../comp/single-team-game-list.component';
import { TitleBarComponent } from '../comp/title-bar.component';
import { TwoTeamsGamesListComponent } from '../comp/two-teams-games-list.component';
import { WeekBarComponent } from '../comp/week-bar.component';
import { IN_MEM_GAME_SERVICE_PROVIDER } from '../dao/mem/games.mem.service';
import { IN_MEM_SETTINGS_PROVIDER } from '../dao/mem/settings.mem.service';
import { IN_MEMORY_TEAMS_SERVICE_PROVIDER } from '../dao/mem/teams.mem.service';
import { IN_MEM_WEEK_SERVICE_PROVIDER } from '../dao/mem/weeks.mem.service';
import { DateMedPipe } from '../pipes/date-med.pipe';
import { NameSwitchPipe } from '../pipes/name-switch.pipe';
import { VsAtGameFormatPipe } from '../pipes/vs-at-game.pipe';
import { IBackend, StaticInitializationService } from '../service/backend/static.backend';
import { DataControlService } from '../service/data-control.service';
import { CancellationsView } from '../views/cancellations';
import { FavoritesListView } from '../views/favorites-list';
import { FieldMapView } from '../views/field-map';
import { GameDetailView } from '../views/game-detail';
import { HomeView } from '../views/home';
import { InitialConfigurationView } from '../views/init-config';
import { MapView } from '../views/map';
import { RegionListView } from '../views/region-list';
import { SchedulesMenuView } from '../views/schedules-menu';
import { SearchView } from '../views/search';
import { SearchResultsView } from '../views/search-results';
import { SettingsView } from '../views/settings';
import { TeamScheduleView } from '../views/team-schedule';
import { TeamSelectView } from '../views/team-select';
import { WeekScheduleView } from '../views/week-schedule';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routes';

@NgModule({
    declarations: [
        // Main
        AppComponent,
        // Pipes
        DateMedPipe,
        NameSwitchPipe,
        VsAtGameFormatPipe,
        // Components/Directives
        SingleTeamGameListComponent,
        TitleBarComponent,
        TwoTeamsGamesListComponent,
        WeekBarComponent,
        // Views
        CancellationsView,
        FavoritesListView,
        FieldMapView,
        GameDetailView,
        HomeView,
        InitialConfigurationView,
        MapView,
        RegionListView,
        SchedulesMenuView,
        SearchView,
        SearchResultsView,
        SettingsView,
        TeamScheduleView,
        TeamSelectView,
        WeekScheduleView,
    ],
    imports: [
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: '',
        }),
        BrowserModule,
        HttpClientModule,
        NgMatIconsModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        DataControlService,
        IN_MEM_SETTINGS_PROVIDER,
        IN_MEM_GAME_SERVICE_PROVIDER,
        IN_MEMORY_TEAMS_SERVICE_PROVIDER,
        IN_MEM_WEEK_SERVICE_PROVIDER,
        MOCK_LOCAL_STORAGE_PROVIDER,
        { provide: IBackend, useClass: StaticInitializationService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
