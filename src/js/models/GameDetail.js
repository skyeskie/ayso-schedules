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
        if(this.home === myTeam) {
            return this.away;
        } else {
            return this.home;
        }
    };

    GameDetail.prototype.isBye = function() {
        return (this.homeTeam.name === '-' || this.awayTeam.name ==='-');
    };

    GameDetail.fromSql = function(results) {
        if(results.length===0) {
            throw "Could not find game";
        }

        var game = results.item(0);
        var home = new Team(game.Home, game.HomeCoach, game.HomeCoachPhone);
        var away = new Team(game.Away, game.AwayCoach, game.AwayCoachPhone);

        //Regex puts region in index 1 and field in index 3
        var location = game.Field.match(/0?(\d{1,4})\s*(Field\s*)?(.+)/);
        $(".game-region").html(match[1]);
        $(".game-field").html(match[3]);

        return new GameDetail(game.Week, game.Jour, game.Heur,
            home, away, location[1], location[3]);
    };
});
