//Cordova initialization
var app = {
    // Application Constructor
    initialize: function() {

    }
};

app.initialize();


//Angular initialization
var aysoApp = angular.module('aysoApp', [
    'ui.router',
    'LocalStorageModule',
    'ngCordova'
]);

/**
 * @ngdoc config
 * @name $cfg
 * @summary contains app configuration parameters
 * @prop {String} remote - URL endpoint for server
 */
aysoApp.constant('$cfg', {
    remote: "http://aysoks.org/app/json.php5"
});
