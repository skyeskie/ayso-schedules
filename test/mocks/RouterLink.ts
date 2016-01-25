import {Directive} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Directive({
               selector: '[routerLink]',
               inputs: ['routeParams: routerLink', 'target: target'],
               host: {
                   '(click)': 'onClick()',
                   '[attr.href]': 'visibleHref',
                   '[class.router-link-active]': 'isRouteActive'
               }
           })
class MockRouterLink {
    private _routeParams: any[];

    private _updateLink(): void {

    }

    visibleHref: string;
    target: string;

    set routeParams(changes: any[]) {
        this._routeParams = changes;
        this._updateLink();
    }

    getRouteParams() {
        return this._routeParams;
    }
}

export { MockRouterLink, RouterLink };
