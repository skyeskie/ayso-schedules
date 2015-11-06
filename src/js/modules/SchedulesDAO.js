/* global aysoApp */

aysoApp.service("SchedulesDAO", function(ConfigDAO, SQLite, localStorageService, aysoUtil, $q) {
    "use strict";
    var ls = localStorageService;
    var db = SQLite;


    /**
     * @returns {number} of weeks in season
     */
    this.getNumWeeks = function() {
        return ls.get("maxWeeks");
    };

    /**
     * Update the cached max weeks value
     * @param weeks (number)
     */
    this.setMaxWeeks = function(weeks) {
        ls.set("maxWeeks", weeks);
    };

    /**
     * Get the cached week start dates
     * @returns (Array)
     */
    this.getWeekStarts = function() {
        return ls.get("weekStarts").split(",");
    };

    /**
     * @returns {number} of week for next games.
     */
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

    }

    function processGames(tx, results) {

    }

    function processTeams(tx, results) {

    }

    function processCoaches(tx, results) {

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

    function promiseSql(sql, process, resolve, reject) {
        if(process === null) {
            process = noProcess;
        }

        db.transaction(
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
    }

    /**
     *
     * @param weekNum
     * @returns {Array}
     */
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

    /**
     * General search function
     * @param region - region number
     * @param divis - division (age) in form U10
     * @param gender - in {'Girls', 'Boys', 'Coed'}
     * @returns {Array} Game objects
     */
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

    /**
     * @param team - Unique team code
     * @returns {Array} Game objects
     */
    this.findByTeam = function(team) {
        var sql = "SELECT ID, Jour, Heur, Field, 'vs' AS HA, away AS Opponent " +
            " FROM games WHERE Home = '"+team+"' " +
            " UNION " +
            " SELECT ID, Jour, Heur, Field, 'at' AS HA, home AS Opponent " +
            " FROM games WHERE Away = '"+team+"' ORDER BY Jour, Heur ASC";

        return promiseSqlReadonly(sql, processGames);
    };

    /**
     * TODO: See where used
     * @param team
     * @param week
     * @returns {Array} Game objects
     */
    this.findByDivWeek = function(team, week) {
        var sql = "SELECT ID, Jour, Heur, Field, Home, Away " +
            " FROM games " +
            " WHERE Week = " + week + " AND" +
            " (Home LIKE '"+team+"' OR Away LIKE '"+team+"')" +
            " ORDER BY Jour, Heur ASC";

        return promiseSqlReadonly(sql, processGames);
    };

    /**
     * List all games from teams stored in favorites
     * @returns {Array} Game objects
     */
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

    /**
     * Get coach information for a specific team
     * @param team
     * @return {Object} Coach
     */
    this.getCoachInfo = function(team) {
        var sql = "SELECT ID, Coach, Phone " +
            " FROM coaches " +
            " WHERE TeamNo = '" +team + "';";

        return promiseSqlReadonly(sql, processCoaches);
    };

    /**
     * Get details for specific game
     * @param gameID
     * @return {Object} Game
     */
    this.getGameDetail = function(gameID) {
        var sql = "SELECT games.*, ch.Coach AS HomeCoach, ch.Phone AS HomeCoachPhone," +
            " ca.Coach AS AwayCoach, ca.Phone AS AwayCoachPhone " +
            "FROM games LEFT JOIN coaches AS ch ON Home = ch.TeamNo" +
            "    LEFT JOIN coaches AS ca ON Away = ca.TeamNo " +
            "WHERE games.ID = '"+gameID+"'";

        return promiseSqlReadonly(sql, processGameDetail);
    };

    this.refreshCaches = function() {
        var sql = "SELECT MIN(Jour) AS Start, Week FROM games GROUP BY Week ORDER BY Week ASC";
        promiseSql(sql);
    };
});
