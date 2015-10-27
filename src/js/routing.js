/* globals aysoApp */
"use strict";

aysoApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/game/:gameId', {
            template: "game",
            controller: "GameInfoCtrl"
        });

    }
]);
