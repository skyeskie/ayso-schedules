/**
 * A model for a game returned from the DAO
 * @typedef {Object}
 * @name GameDataModel
 * @ngdoc models
 * @property {String} ID - unique identifier
 * @property {String} Jour - day in 'YYYY-MM-DD'
 * @property {String} Heur - hour in 'HH:MM:SS'
 * @property {String} Field - format '&lt;Region&gt; Field &lt;Code&gt;'
 *     the region is a number
 * @property {String} Home - unique ID for home team
 * @property {String} Away - unique ID for home team
 * @property {?String} Week - week number
 * @property {?String} Divis - code for AYSO division (Ex: U16) See {@link aysoUtil.divisionToCode}
 */

angular.module('aysoApp').factory('Game', function(){
    "use strict";

    /**
     * @desc Model for representing game data (summary)
     * @name Game
     * @ngdoc models
     * @param {*} id - Primary key for accessing game
     * @param {String} day - Day of game. Prefer <pre>YYYY-MM-DD</pre>
     * @param {String} hour - Time of game. Prefer <pre>HH:MM:SS</pre>
     * @param {String} field - where the game is played
     * @param {String} home - ID code for the home team OR '-' for a bye
     * @param {String} away - ID code for the away team OR '-' for a bye
     * @constructor
     */
    function Game(id, day, hour, field, home, away) {
        this.id = id;
        this.day = day;
        this.hour = hour;
        this.field = field;
        this.home = home;
        this.away = away;
    }

    /**
     * @function
     * @memberof GameDetail
     * @desc determine whether one of teams indicates a bye
     * @returns {boolean}
     *
     * @this {Game}
     */
    Game.prototype.isBye = function() {
        return (this.home === '-' || this.away === '-');
    };

    /**
     * @function arrayfromSql
     * @memberof GameDetail
     * @static
     * @desc Creates a list of games from the DataModel
     * @param {Array.<GameDataModel>} results
     * @returns {Array.<Game>}
     */
    Game.arrayfromSql = function(results) {
        var games = [];
        angular.forEach(results, function(row) {
            games.push(Game.fromSql(row));
        });
        return games;
    };

    /**
     * @function fromSql
     * @memberof GameDetail
     * @static
     * @desc Translates from a GameDataModel (ie from dao)
     * @param {GameDataModel} row
     * @returns {Game}
     */
    Game.fromSql = function(row) {
        return new Game(row.ID, row.Jour, row.Heur, row.Field, row.Home, row.Away);
    };

    //Game.sortByesFirst = function(g1, g2) {
    //
    //};

    return Game;
});
