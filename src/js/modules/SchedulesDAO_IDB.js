/**
 * @ngdoc service
 * @name SchedulesDAO_IDB
 * @desc IndexedDB backend for {@link SchedulesDAO}
 * @implements SchedulesDAO
 *
 * @todo: Everything...
 */

angular.module('aysoApp').service("SchedulesDAO_IDB", function(ConfigDAO, $indexedDB, WeekCache, localStorageService, aysoUtil, $q, Game, Team, GameDetail) {
    "use strict";
    var ls = localStorageService;
    var db = $indexedDB;
    var cfg = ConfigDAO;
    var IDBKeyRange = db.IDBKeyRange;

    function findGamesInRegionBy(key, val, region) {
        if(region === null) {
            region = ConfigDAO.getRegion();
        }

        return $q(function(resolve, reject) {
            db.openStore('games', function (games) {
                games.findBy(key, val).then(function() {
                    var oneRegion = games.filter(function(v) { return v === region; });
                    resolve(oneRegion);
                }, reject);
            });
        });
    }

    function findGamesBy(key,val) {
        return $q(function(resolve, reject) {
            db.openStore('games', function (games) {
                games.findBy(key, val).then(resolve, reject);
            });
        });
    }

    function sortByDateThenHome(l, r) {
        if(l.date === r.date) {
            if(l.time === r.time) {
                //Assume uniqueness of (date, time, homeTeam)
                return l.home < r.home;
            }
            return l.time < r.time;
        }
        return l.date < r.date;
    }

    this.findByWeek = function(week) {
        return findGamesInRegionBy('week', week);
    };

    this.findGames = function() {

    };

    this.findByTeam = function(team) {
        var _defer = $q.defer();
        var games = [];
        //Team key unique across regions, so no need to filter
        findGamesBy('home', team).then(function(data) {
            games = data;
            findGamesBy('away', team).then(function(data) {
                games.concat(data);
                games.sort(sortByDateThenHome);
                _defer.resolve(games);
            }, _defer.reject);
        }, _defer.reject);
    };

    this.findByDivWeek = function() {


    };

    this.findByFavorites = function() {
        var favorites = ConfigDAO.getSavedTeams();
        if(favorites.length === 0) {
            return [];
        }

    };

    this.getCoachInfo = function(teamID) {
        return $q(function(resolve, reject) {
            db.openStore('teams', function (teams) {
                teams.find(teamID).then(resolve, reject);
            });
        });
    };

    this.getGameDetail = function(gameID) {
        var _defer = $q.defer();
        var self = this;
        db.openStore('games', function (games) {
            games.find(gameID).then(function(game) {
                self.getCoachInfo(game.homeID).then(function(team) {
                    game.home = team;
                    if(game.home && game.away) {
                        _defer.resolve(game);
                    }
                }, _defer.reject);
                self.getCoachInfo(game.awayID).then(function(team) {
                    game.away = team;
                    if(game.home && game.away) {
                        _defer.resolve(game);
                    }
                }, _defer.reject);
            }, _defer.reject);
        }, _defer.reject);
    };

    this.refreshCaches = function() {

    };

    this.putGames = function() {

    };

    this.putCoaches = function() {

    };

});
