import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'title-bar',
    directives: [RouterLink],
    template: `
    <nav class="navbar navbar-fixed-top navbar-dark bg-primary">
        <div class="nav navbar-nav">
            <!--<a class="nav-item nav-link" [routerLink]="['/Home']">Back</a>-->
            <a class="nav-item nav-link centered" [routerLink]="['/Home']">AYSO Kansas</a>
        </div>
    </nav>
    <div class="placeholder invisible" style="height: 3.5rem">&nbsp;</div>
    `,
})
class TitleBarComponent {}

export {TitleBarComponent, TitleBarComponent as default}
