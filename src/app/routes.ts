import GameView from "../views/game-detail";
import RegionListView from "../views/region-list";
import FieldMapView from "../views/field-map";
import {HomeView} from "../views/home";
import FavoritesListView from '../views/favorites-list';
import {DivisionListView} from '../views/division-list';
import {DivisionSelectView} from '../views/division-select';
import {CancellationsView} from '../views/cancellations';
import {MapView} from '../views/map';
import {TeamScheduleView} from '../views/team-schedule';
import {WeekScheduleView} from '../views/week-schedule';
import {SchedulesMenuView} from '../views/schedules-menu';
import SettingsView from '../views/settings';
import {TeamSelectView} from '../views/team-select';

/**
 * Main routing configuration
 *
 * TODO: Rework routes so that alias points to the default ID
 * TODO: Try to modularize and split the @RouteConfig within different files
 */
let AYSO_APP_ROUTES = [
    {path:'/', useAsDefault: true,
        name: 'Home', component: HomeView},
    {path:'/schedules',
        name: 'SchedulesMenu', component: SchedulesMenuView},
    {path:'/favorites',
        name: 'FavoritesSchedule', component: FavoritesListView},
    {path:'/search',
        name: 'DivisionSelect', component: DivisionSelectView},
    {path:'/search/week/:week/results',
        name: 'DivisionSchedule', component: DivisionListView},
    {path:'/game/:id',
        name: 'GameDetail', component: GameView},
    {path:'/regions',
        name: 'RegionList', component: RegionListView},
    {path:'/region/:region/field',
        name: 'FieldDetail', component: FieldMapView},
    {path:'/region/:region/map',//TODO: Fill viewport
        name: 'MapDetail', component: MapView},
    {path:'/teams',
        name: 'TeamSelect', component: TeamSelectView},
    {path:'/team/:id',
        name: 'TeamSchedule', component: TeamScheduleView},
    {path:'/week',
        name: 'CurWeekSchedule', component: WeekScheduleView},
    {path:'/week/:num',
        name: 'WeekSchedule', component: WeekScheduleView},
    {path:'/twitter',
        name: 'TwitterView', component: CancellationsView},
    {path:'/settings',
        name: 'Settings', component: SettingsView}
];

export default AYSO_APP_ROUTES;
