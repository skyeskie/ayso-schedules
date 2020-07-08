/* tslint:disable:no-any */
import { Directive, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
    selector: '[routerLink]',
})
class MockRouterLink {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    @HostListener('click')
    onClick(): void {
        this.navigatedTo = this.linkParams;
    }
}

export const MOCK_ROUTER_LINK_PROVIDER = { provide: RouterLink, useClass: MockRouterLink };

export { MockRouterLink, RouterLink };
