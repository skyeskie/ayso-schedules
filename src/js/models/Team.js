/**
 * A model for a row in the Coaches table
 * @typedef {Object}
 * @name CoachDataModel
 * @ngdoc models
 * @property {String} ID - unique coach revord identifier
 * @property {String} Divis - division code
 * @property {String} TeamNo - unique team identifier
 * @property {String} Coach - name of format <pre>Last, First</pre>
 * @property {String} Phone - Phone number of format <pre>(000) 000-0000</pre>
 */

angular.module('aysoApp').factory('Team', function(){
    "use strict";

    /**
     * Representation of team information
     * @name Team
     * @ngdoc models
     * @param {String} id - unique team identifier
     * @param {String} coach - name of format <pre>Last, First</pre>
     * @param {String} phone - Phone number of format <pre>(000) 000-0000</pre>
     * @constructor
     */
    function Team(id, coach, phone) {
        this.code = id;
        this.coach = coach;
        this.coachTel = phone;
    }

    return Team;
});
