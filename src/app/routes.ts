/* tslint:disable:trailing-comma */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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

/**
 * Main routing configuration
 *
 * TODO: Rework routes so that alias points to the default ID
 * TODO: Try to modularize and split the @RouteConfig within different files
 */
const AYSO_APP_ROUTES = [
    {path: '', useAsDefault: true,
        name: 'Home', component: HomeView},
    {path: 'schedules',
        name: 'SchedulesMenu', component: SchedulesMenuView},
    {path: 'favorites',
        name: 'FavoritesSchedule', component: FavoritesListView},
    {path: 'search',
        name: 'DivisionSelect', component: SearchView},
    {path: 'search/week/:week/results',
        name: 'DivisionSchedule', component: SearchResultsView},
    {path: 'game/:id',
        name: 'GameDetail', component: GameDetailView},
    {path: 'regions',
        name: 'RegionList', component: RegionListView},
    {path: 'region/:region/field',
        name: 'FieldDetail', component: FieldMapView},
    {path: 'region/:region/map', // TODO: Fill viewport
        name: 'MapDetail', component: MapView},
    {path: 'teams',
        name: 'TeamSelect', component: TeamSelectView},
    {path: 'team/:id',
        name: 'TeamSchedule', component: TeamScheduleView},
    {path: 'week',
        name: 'CurWeekSchedule', component: WeekScheduleView},
    {path: 'week/:num',
        name: 'WeekSchedule', component: WeekScheduleView},
    {path: 'twitter',
        name: 'TwitterView', component: CancellationsView},
    {path: 'settings',
        name: 'Settings', component: SettingsView},
    {path: 'init',
        name: 'Init', component: InitialConfigurationView },
];

@NgModule({imports: [RouterModule.forRoot(AYSO_APP_ROUTES)], exports: [RouterModule]})
export class AppRoutingModule {}

export default AYSO_APP_ROUTES;
