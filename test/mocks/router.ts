/* tslint:disable:no-any */
import {ApplicationRef, Component, Directive, provide} from 'angular2/core';
import {
    Router, RouterOutlet, Instruction, RouteDefinition, RouterLink,
    ComponentInstruction, ROUTER_PROVIDERS, LocationStrategy, Location,
    RouteRegistry, RouteParams, ROUTER_PRIMARY_COMPONENT,
} from 'angular2/router';
import {MockApplicationRef} from 'angular2/testing';
import {MockLocationStrategy} from 'angular2/src/mock/mock_location_strategy';
import {DefaultInstruction} from 'angular2/src/router/instruction';
import {RootRouter} from 'angular2/src/router/router';

@Component({
    template: ``
})
class MockComponent {}

class MockRouter extends RootRouter {
    //Stubbed method
    constructor(registry, location, primaryComponent) {
        super(registry, location, primaryComponent);
    }
    childRouter(hostComponent: any): Router { return null; };
    auxRouter(hostComponent: any): Router { return null; };
    registerPrimaryOutlet(outlet: RouterOutlet): Promise<boolean> { return null; };
    registerAuxOutlet(outlet: RouterOutlet): Promise<boolean> { return null; };
    isRouteActive(instruction: Instruction): boolean { return false; };
    config(definitions: RouteDefinition[]): Promise<any> { return null; };
    navigate(linkParams: any[]): Promise<any> { return null; };
    navigateByUrl(url: string, _skipLocationChange?: boolean): Promise<any> { return null; };
    navigateByInstruction(instruction: Instruction, _skipLocationChange?: boolean): Promise<any> { return null; };
    commit(instruction: Instruction, _skipLocationChange?: boolean): Promise<any> { return null; };
    subscribe(onNext: (value: any) => void): Object { return null; };
    deactivate(instruction: Instruction): Promise<any> { return null; };
    recognize(url: string): Promise<Instruction> { return null; };
    renavigate(): Promise<any> { return null; };

    //Used by RouterLink
    generate(linkParams: any[]): Instruction {
        console.log(linkParams);
        return new DefaultInstruction(null, null);
    };
}

let MOCK_ROUTER_PROVIDERS = [
    ...ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockComponent }),
    provide(LocationStrategy, {useClass: MockLocationStrategy}),
    provide(Router, {
        useClass: MockRouter,
        deps: [null, Location, null],
    }),
    provide(RouteParams, { useFactory: () => {
        return new RouteParams({'id': '111'});
    },}),
    provide(ApplicationRef, { useClass: MockApplicationRef }),
];

export { Router, MockRouter, MOCK_ROUTER_PROVIDERS, RouteParams, MockComponent }
