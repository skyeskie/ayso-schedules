/* global angular */

/**
 * @typedef {Object} GameDetailSqlResult
 * @prop {Number} length
 * @function item - returns {link: GameDetailDataModel}
 */

/**
 * A model for a game returned from the DAO
 * @typedef {Object} GameDetailDataModel
 * @property {String} Week - week number of  game
 * @property {String} Jour - day in 'YYYY-MM-DD'
 * @property {String} Heur - hour in 'HH:MM:SS'
 * @property {String} Field - format '&lt;Region&gt; Field &lt;Code&gt;'
 *     the region is a number
 * @property {String} Home - unique ID for home team
 * @property {String} Away - unique ID for home team
 * @property {String} HomeCoachName - <pre>Last, First</pre> name of home team
 * @property {String} AwayCoachName - <pre>Last, First</pre> name of away team
 * @property {String} HomeCoachPhone - Phone number of format <pre>(000) 000-0000</pre>
 * @property {String} AwayCoachPhone - Phone number of format <pre>(000) 000-0000</pre>
 */

angular.module('aysoApp').factory('GameDetail', function(Team) {
    "use strict";

    /**
     * Model for full game detail, with coach/team info merged in
     * @param {String} weekNum - week number of  game
     * @param {String} date
     * @param {String} time
     * @param {Team} homeTeam
     * @param {Team} awayTeam
     * @param {String} region
     * @param {String} field
     * @constructor
     */
    function GameDetail(weekNum, date, time, homeTeam, awayTeam, region, field) {
        this.weekNum = weekNum;
        this.date = date;
        this.time = time;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.region = region;
        this.field = field;
    }

    /**
     * @function getOpponent
     *
     * Find the opponent of a particular team in a game
     * @param {String|Team} myTeam
     * @returns {Team} the team that is not myTeam.<br/>
     *     If both teams are the same code, returns the awayTeam
     * @throws {Error} for one of the following conditions <ul>
     *     <li>Invalid input</li>
     *     <li>Neither team matches the input code</li>
     * @this {GameDetail}
     */
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

    /**
     * @function
     * @desc determine whether one of teams indicates a bye
     * @returns {boolean}
     *
     * @this {GameDetail}
     */
    GameDetail.prototype.isBye = function() {
        return (this.homeTeam.code === '-' || this.awayTeam.code ==='-');
    };

    /**
     * @function fromSql
     * @static
     * @desc Translates from a data model (ie from dao)
     * @param {GameDetailSqlResult} results
     * @returns {GameDetail}
     */
    GameDetail.fromSql = function(results) {
        //Retrieved by unique ID, so should only be one item
        if(results.length !== 1) {
            throw "Could not find game (" + results.length + " records)";
        }

        /** @type {GameDetailDataModel} */
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
