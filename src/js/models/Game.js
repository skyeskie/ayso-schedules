angular.module('aysoApp').factory('Game', function(){
    "use strict";

    function Game(id, day, hour, field, home, away) {
        this.id = id;
        this.day = day;
        this.hour = hour;
        this.field = field;
        this.home = home;
        this.away = away;
    }

    Game.prototype.isBye = function() {
        return (this.home === '-' || this.away === '-');
    };

    Game.arrayfromSql = function(results) {
        var games = [];
        angular.forEach(results, function(row) {
            games.push(Game.fromSql(row));
        });
        return games;
    };

    Game.fromSql = function(row) {
        return new Game(row.ID, row.Jour, row.Heur, row.Field, row.Home, row.Away);
    };

    //Game.sortByesFirst = function(g1, g2) {
    //
    //};

    return Game;
});
