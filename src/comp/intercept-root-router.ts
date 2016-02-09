import {CONST_EXPR} from 'angular2/src/facade/lang';
import {Provider, ApplicationRef, Inject, Type} from 'angular2/core';
import {RootRouter} from 'angular2/src/router/router';
import {
    Router, RouteRegistry, Instruction,
    Location, ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';

import {SettingsDAO} from '../dao/settings.interface';
import {DataControlService} from '../dao/data-control.service';

//Constructor requires super() to be called ahead of object-level instantiation
//Need settings and (appIsConfigured) to be present before super(), so moving to module scope
let settings:SettingsDAO;
let appIsConfigured:boolean = false;
function executeIntercept(url:string):boolean {
    if(appIsConfigured) {
        return false;
    }
    appIsConfigured = settings.isAppConfigured();
    return !(appIsConfigured || url.toLocaleLowerCase().startsWith('/init'));
}

class InterceptRootRouter extends RootRouter {
    public navigateToInit(url?:string) {
        let instruction = this.generate(['/Init', {url: url}]);
        return this.navigateByInstruction(instruction, false);
    }

    navigate(linkParams: any[]) {
        if(executeIntercept(linkParams[0])) {
            let url = this.generate(linkParams).toRootUrl();
            return this.navigateToInit(url);
        }

        return super.navigate(linkParams);
    }

    navigateByUrl(url: string, _skipLocationChange: boolean = false): Promise<any> {
        if(executeIntercept(url)) {
            return this.navigateToInit(url);
        }

        return super.navigateByUrl(url, _skipLocationChange);
    }
}

function interceptRouterFactory(registry, location, primaryComponent, appRef, settingsDAO) {
    //Need to execute before super() constructor on router
    settings = settingsDAO;
    appIsConfigured = settings.isAppConfigured();

    var rootRouter = new InterceptRootRouter(registry, location, primaryComponent);
    appRef.registerDisposeListener(() => rootRouter.dispose());
    return rootRouter;
}


const INTERCEPT_ROUTER_PROVIDER = CONST_EXPR(
    new Provider(Router,
    {
        useFactory: interceptRouterFactory,
        deps: CONST_EXPR([
            RouteRegistry, Location, ROUTER_PRIMARY_COMPONENT, ApplicationRef, SettingsDAO
        ])
    }
));

export {INTERCEPT_ROUTER_PROVIDER as default, InterceptRootRouter, INTERCEPT_ROUTER_PROVIDER}
