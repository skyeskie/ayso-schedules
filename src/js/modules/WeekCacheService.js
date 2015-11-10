/**
 * Cache interface for week number handling
 * @ngdoc service
 * @name WeekCache
 */

angular.module('aysoApp').service("WeekCache", function(localStorageService) {
    "use strict";
    var ls = localStorageService;

    /**
     * @function getNumWeeks
     * @desc Get the number of weeks in a season
     * @returns {number}
     */
    this.getNumWeeks = function() {
        return ls.get("maxWeeks");
    };

    /**
     * @function setMaxweeks
     * @desc Update the cached max weeks value
     * @param {number} weeks
     */
    this.setMaxWeeks = function(weeks) {
        ls.set("maxWeeks", weeks);
    };

    /**
     * @function getWeekStarts
     * @desc Get the cached week start dates
     * @returns {Array.String} - sorted array of dates in <pre>YYYY-MM-DD</pre> format
     */
    this.getWeekStarts = function() {
        return ls.get("weekStarts").split(",");
    };

    /**
     * @function putWeekStarts
     * @desc Replaces the cache of week start dates
     * @param {Array.<String>} val - sorted array of dates in <pre>YYYY-MM-DD</pre> format
     */
    this.putWeekStarts = function(val) {
        ls.set('weekStarts', val.join(','));
    };


    /**
     * @function getCurrentWeek
     * @desc Determines the week number for the current date
     * @returns {number}
     */
    this.getCurrentWeek = function() {
        var today = new Date();
        var dateStrings = this.getWeekStarts();

        //Loop from end. First one we're after is the current week we're in
        for(var i = dateStrings.length; i>=0; --i) {
            if(today >= new Date(dateStrings[i])) {
                return i+1;
            }
        }

        console.warn("Cannot determine current week.");
        return 1; //Default to 1 so we hopefully don't blow anything up
    };
});
