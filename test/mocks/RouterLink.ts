/* tslint:disable:no-any */
import {Directive} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Directive({
   selector: '[routerLink]',
   inputs: ['routeParams: routerLink', 'target: target'],
   host: {
       '(click)': 'onClick()',
       '[attr.href]': 'visibleHref',
       '[class.router-link-active]': 'isRouteActive',
   },
})
class MockRouterLink {
    visibleHref: string;
    target: string;

    private _routeParams: any[];

    set routeParams(changes: any[]) {
        this._routeParams = changes;
        this._updateLink();
    }

    getRouteParams() {
        return this._routeParams;
    }

    private _updateLink(): void {
        //No-op
    }
}

export { MockRouterLink, RouterLink };
