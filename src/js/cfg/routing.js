/* globals aysoApp */
aysoApp.config(function($stateProvider, $urlRouterProvider) {
    "use strict";

    $urlRouterProvider.otherwise("init");

    $stateProvider
        //Utility states
        .state('init', {
            url: '/init',
            templateUrl: 'views/init.html'
        })

        .state('error', {
            url: '/error/:errorMsg',
            template: '<b>Error:</b> {{errorMsg}}',
            controller: function($scope, $stateParams) {
                $scope.errorMsg = $stateParams.errorMsg;
            }
        })

        //Main states
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
        })
        .state('game', {
            url: '/game/:gameId',
            templateUrl: 'views/game.html',
            resolve: {
                game: function(SchedulesDAO, $stateParams) {
                    return SchedulesDAO.getGameDetail($stateParams.gameId);
                }
            },
            controller: function($scope, game) {
                $scope.game = game;
            }
        });
    //End on chain $stateProvider
});

//Error handling
aysoApp.run(function($rootScope, $state) {
    "use strict";
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        $state.go('error', {
            message: error.message + ' while changing from ' + fromState + ' to ' + toState
        });
    });
});
