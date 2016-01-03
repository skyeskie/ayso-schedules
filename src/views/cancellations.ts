import {View, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {RouteParams} from "angular2/router";

@View({
   template: `
   <div id="twitter" data-role="page" class="page">
        <div class="ui-bar ui-bar-d">Cancellations</div>

        <a class="twitter-timeline" href="https://twitter.com/AYSOKS"
          data-widget-id="305786822305386496">Tweets by @AYSOKS</a>
        <div class="messages"></div>
    </div>
    <script id="twitter-wjs" src="https://platform.twitter.com/widgets.js"/>
   `
})
//TODO: Revisit twitter widget
export class CancellationsView {
    constructor(
        private _router:Router,
        private _routeParams:RouteParams) {
    }
}
