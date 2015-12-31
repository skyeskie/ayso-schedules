import {Component} from 'angular2/core.d';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {GameComponent} from "../views/game.component";

@Component({
    selector: 'ayso-app',
    template: '<p>TEST</p>',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path:'/game/:id', name: 'GameDetail', component: GameComponent}
])

export class AppComponent { }
