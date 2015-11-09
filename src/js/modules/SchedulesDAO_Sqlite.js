/* global aysoApp, angular */

/**
 * @ngapp service
 * @name SchedulesDAO_Sqlite
 * @desc SQLite backend for SchedulesDAO
 * @implements SchedulesDAO
 */
aysoApp.service("SchedulesDAO_Sqlite", function(ConfigDAO, SQLite, localStorageService, aysoUtil, $q, Game, Team, GameDetail) {
    "use strict";
    var ls = localStorageService;
    var db = SQLite;

    this.getNumWeeks = function() {
        return ls.get("maxWeeks");
    };

    this.setMaxWeeks = function(weeks) {
        ls.set("maxWeeks", weeks);
    };

    this.getWeekStarts = function() {
        return ls.get("weekStarts").split(",");
    };

    this.putWeekStarts = function(val) {
        ls.set('weekStarts', val.join(','));
    };

    var curWeek = null;
    this.getCurrentWeek = function() {
        if(curWeek !== null) {
            return curWeek;
        }

        var today = new Date();
        var dateStrings = this.getWeekStarts();

        //Loop from end. First one we're after is the current week we're in
        for(var i = dateStrings.length; i>=0; --i) {
            if(today >= new Date(dateStrings[i])) {
                curWeek = i+1;
                return i+1;
            }
        }

        console.warn("Cannot determine current week.");
        return 1; //Default to 1 so we hopefully don't blow anything up
    };

    function processGameDetail(tx, results) {
        return GameDetail.arrayfromSql(results);
    }

    function processGames(tx, results) {
        return Game.arrayfromSql(results);
    }

    function processTeams(tx, results) {
        return Team.arrayfromSql(results);
    }

    function noProcess(tx, results) {
        return results;
    }

    function promiseSqlReadonly(sql, process) {
        if(process === null) {
            process = noProcess;
        }

        return $q(function(resolve, reject) {
            db.readTransaction(
                function (tx) {
                    tx.executeSql(sql, [],
                        function (tx, results) {
                            resolve(process(tx, results));
                        }
                    );
                },
                function (error) {
                    reject(error);
                }
            );
        });
    }

    function promiseSql(transactionFn) {
        return $q(function(resolve, reject) {
            db.transaction(transactionFn,
                function (error) {
                    reject(error);
                },
                function () {
                    resolve();
                }
            );
        });
    }

    this.findByWeek = function(weekNum) {
        var region = aysoUtil.regionToID(ConfigDAO.getRegion());
        if(region===null || typeof r === 'undefined') {
            region = "";
        }

        var sql = "SELECT * FROM games " +
            " WHERE Week = "+Number(weekNum) +
            " AND ( Home LIKE '"+region+"%' OR Away LIKE '"+region+"%')" +
            " ORDER BY Heur ASC";

        return promiseSqlReadonly(sql, processGames);
    };

    this.findTeams = function(region, divis, gender) {
        var reg = aysoUtil.regionToID(region);
        var div = aysoUtil.divisionToCode(divis);
        var g = aysoUtil.genderToCode(gender);

        var sql = "SELECT DISTINCT away AS Home FROM games" +
            " WHERE away LIKE '"+reg+div+'%'+g+"' " +
            " AND away <> '-' " +
            " ORDER BY away ASC";

        return promiseSqlReadonly(sql, processTeams);
    };

    this.findByTeam = function(team) {
        var sql = "SELECT ID, Jour, Heur, Field, 'vs' AS HA, away AS Opponent " +
            " FROM games WHERE Home = '"+team+"' " +
            " UNION " +
            " SELECT ID, Jour, Heur, Field, 'at' AS HA, home AS Opponent " +
            " FROM games WHERE Away = '"+team+"' ORDER BY Jour, Heur ASC";

        return promiseSqlReadonly(sql, processGames);
    };

    this.findByDivWeek = function(team, week) {
        var sql = "SELECT ID, Jour, Heur, Field, Home, Away " +
            " FROM games " +
            " WHERE Week = " + week + " AND" +
            " (Home LIKE '"+team+"' OR Away LIKE '"+team+"')" +
            " ORDER BY Jour, Heur ASC";

        return promiseSqlReadonly(sql, processGames);
    };

    this.findByFavorites = function() {
        var in_list = ConfigDAO.getSavedTeams().join("','");
        if(in_list.length > 0) {
            in_list = "'" + in_list + "'";
        } else {
            in_list = "'NoTeamMatchesThis'";
        }

        var sql = "SELECT ID, Jour, Heur, Field, Home, Away " +
            " FROM games " +
            " WHERE Home IN ("+in_list+") " +
            "OR Away IN ("+in_list+") " +
            " ORDER BY Jour, Heur ASC";

        return promiseSqlReadonly(sql, processGames);
    };

    this.getCoachInfo = function(team) {
        var sql = "SELECT ID, Coach, Phone " +
            " FROM coaches " +
            " WHERE TeamNo = '" +team + "';";

        return promiseSqlReadonly(sql, processTeams);
    };

    this.getGameDetail = function(gameID) {
        var sql = "SELECT games.*, ch.Coach AS HomeCoach, ch.Phone AS HomeCoachPhone," +
            " ca.Coach AS AwayCoach, ca.Phone AS AwayCoachPhone " +
            "FROM games LEFT JOIN coaches AS ch ON Home = ch.TeamNo" +
            "    LEFT JOIN coaches AS ca ON Away = ca.TeamNo " +
            "WHERE games.ID = '"+gameID+"'";

        return promiseSqlReadonly(sql, processGameDetail);
    };

    this.refreshCaches = function() {
        var self = this;
        var sql = "SELECT MIN(Jour) AS Start, Week FROM games GROUP BY Week ORDER BY Week ASC";
        promiseSqlReadonly(sql).then(function(results) {
            if(results.rows.length === 0) {
                console.error("Week cache setup failed");
                self.setMaxWeeks(9);
            }

            var maxWeek = 0;
            var weekStarts = [];
            for(var i=0; i<results.rows.length; ++i) {
                weekStarts[i] = results.rows.item(i).Start;
                if(results.rows.item(i).Week > maxWeek) {
                    maxWeek = results.rows.item(i).Week;
                }
            }

            self.setMaxWeeks(maxWeek);
            self.putWeekStarts(weekStarts);
        });
    };

    this.putGames = function(gamesList, resetTable) {
        return promiseSql(function(tx) {
            if(resetTable === true) {
                tx.executeSql('DELETE FROM games WHERE 1');
            }

            angular.forEach(gamesList, function(game) {
                tx.executeSql("INSERT OR REPLACE INTO games " +
                    "(ID, Field, Week, Jour, Heur, Divis, Away, Home) " +
                    "VALUES ("+game.ID+",'"+game.Field+"'," +
                    "'"+game.Week+"','"+game.Jour+"','"+game.Heur+"'," +
                    "'"+game.Divis+"','"+game.Away+"','"+game.Home+"')"
                );
            });
        });

    };

    this.putCoaches = function(coachesList, resetTable) {
        return promiseSql(function(tx) {
            if (resetTable === true) {
                tx.executeSql('DELETE FROM coaches WHERE 1');
            }

            angular.forEach(coachesList, function(coach) {
                tx.executeSql("INSERT OR REPLACE INTO coaches " +
                    "(ID, Divis, TeamNo, Coach, Phone) " +
                    "VALUES ("+coach.ID+", '"+coach.Divis+"', " +
                    "'"+coach.TeamNo+"', '"+coach.Coach+"', '"+coach.Phone+"')"
                );
            });
        });
    };
});
