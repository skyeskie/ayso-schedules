import {Component} from 'angular2/core.d';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import GameComponent from "../views/game.component";
import RegionListComponent from "../views/region-list.component";
import {FieldComponent} from "../views/field.component";
import {HomeComponent} from "../views/home.component";


@Component({
    selector: 'ayso-app',
    template: '<p>TEST</p>',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path:'/', useAsDefault: true,
        name: 'Home', component: HomeComponent},
    {path:'/favorites',
        name: 'FavoritesSchedule', component: HomeComponent},
    {path:'/division/:divis/:week',
        name: 'DivisionSchedule', component: HomeComponent},
    {path:'/game/:id',
        name: 'GameDetail', component: GameComponent},
    {path:'/regions',
        name: 'RegionList', component: RegionListComponent},
    {path:'/region/:region/field',
        name: 'FieldDetail', component: FieldComponent},
    {path:'/region/:region/map',
        name: 'MapDetail', component: HomeComponent},
    {path:'/region/:region/:division/:divis',
        name: 'XRegionList', component: HomeComponent},
    {path:'/teams',
        name: 'TeamSelect', component: HomeComponent},
    {path:'/team/:id',
        name: 'TeamSchedule', component: HomeComponent},
    {path:'/week',
        name: 'WeekSchedule', component: HomeComponent},
    {path:'/week/:num',
        name: 'WeekSchedule', component: HomeComponent},
    {path:'/twitter',
        name: 'TwitterView', component: HomeComponent},
    {path:'/settings',
        name: 'Settings', component: HomeComponent}
])

export class AppComponent { }
