/* global angular */

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
