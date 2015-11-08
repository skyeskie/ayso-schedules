/* global angular */

angular.module('aysoApp').factory('GameDetail', function(Team) {
    "use strict";

    function GameDetail(weekNum, date, time, homeTeam, awayTeam, region, field) {
        this.weekNum = weekNum;
        this.date = date;
        this.time = time;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.region = region;
        this.field = field;
    }

    GameDetail.prototype.getOpponent = function(myTeam) {
        if(typeof myTeam === 'string') {
            if(this.homeTeam.code === myTeam) {
                return this.awayTeam;
            }

            if(this.awayTeam.code === myTeam) {
                return this.homeTeam;
            }

            throw Error("Neither team matches " + myTeam + " so cannot get opponent");
        }

        if((typeof myTeam === 'object') && (typeof myTeam.code === 'string')) {
            if (angular.equals(this.homeTeam, myTeam)) {
                return this.awayTeam;
            }

            if (angular.equals(this.awayTeam, myTeam)) {
                return this.homeTeam;
            }

            throw Error("Neither team matches " + myTeam.code + " so cannot get opponent");
        }

        throw Error("Unrecognized format for myTeam:" + myTeam);
    };

    GameDetail.prototype.isBye = function() {
        return (this.homeTeam.code === '-' || this.awayTeam.code ==='-');
    };

    GameDetail.fromSql = function(results) {
        //Retrieved by unique ID, so should only be one item
        if(results.length !== 1) {
            throw "Could not find game (" + results.length + " records)";
        }

        var game = results.item(0);
        var home = new Team(game.Home, game.HomeCoach, game.HomeCoachPhone);
        var away = new Team(game.Away, game.AwayCoach, game.AwayCoachPhone);

        //Regex puts region in index 1 and field in index 3
        var location = game.Field.match(/0?(\d{1,4})\s*(Field\s*)?(.+)/);
        return new GameDetail(game.Week, game.Jour, game.Heur,
            home, away, location[1], location[3]);
    };

    return GameDetail;
});
