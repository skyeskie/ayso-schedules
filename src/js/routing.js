/* globals aysoApp */
aysoApp.config(['$routeProvider',
    function($routeProvider) {
        "use strict";

        $routeProvider.when('/game/:gameId', {
            template: "game",
            controller: "GameInfoCtrl"
        });

    }
]);
