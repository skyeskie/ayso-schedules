/* global angular, aysoApp */

/**
 * @ngapp service
 * @name aysoUtil
 * @desc Collection of utilities and config data for the AYSO app
 * @todo Figure out better configuration method
 */
aysoApp.service('aysoUtil', function($state) {
    "use strict";

    return {
        /*
         * Region information for the app.
         */

        /**
         * List of regions for the app
         */
        regions : [ "49", "105", "208", "253", "491" ],
        /**
         * Long name for regions.
         * See {@link regions} for the code for each region
         */
        regionsLong : [ "Stryker", "Southview", "West Wichita", "Valley Center",
            "Clearwater" ],

        /**
         * List of divisions for the app
         */
        divisions : [ "U5", "U6", "U8", "U10", "U12", "U14", "U19" ],

        /**
         * Switches name around from Last, First to First Last
         * @param {String} name in "Last, First" format
         * @return {String} in "First Last" format
         *
         * @TODO: Convert this into a filter
         */
        nameSwitch : function(name) {
            var match = name.match(/([^,]+), ?(.+)/);
            if(match !== null) {
                return match[2] + " " + match[1];
            }
            //Don't have a Last, First so just passthrough
            return name;
        },

        /**
         * Short list of months for date formatting
         */
        months : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept",
            "Oct", "Nov", "Dec" ],

        /**
         * Helper function to format the date
         * @param {String} jour - Date in <pre>YYYY-MM-DD</pre> format
         * @returns {String} date in format <pre>"{ShortMonth} {Day}"</pre> (Ex: Jan 4)
         */
        formatDate : function(jour) {
            var match = jour.match(/(\d{4})\-(\d{1,2})\-(\d{1,2})/);
            var os = this.months[Number(match[2])-1];
            os += " " + match[3];
            return os;
        },

        /**
         * Helper function to format the date and time. Date and time are
         * concatenated and fed to <code>Date()</code>
         * @param {String} jour - Date of format accepted by <code>Date()</code>
         * @param {String} heur - Time string of format accepted by <code>Date()</code>
         * @returns {String} Date in format <pre>Jan 4, 2:04 PM</pre>
         */
        formatDateTime : function(jour, heur) {
            var d = new Date(jour + " " + heur);
            var os = this.months[d.getMonth()];
            os += " " + d.getDate() + ", ";
            var h = d.getHours();
            var am = true;
            var min = d.getMinutes();
            if (h > 11) {
                am = false;
            }
            if (h > 12) {
                h -= 12;
            }
            os += h + ":" + min;
            if (!min){
                os += "0";
            }
            os += " " + ((am) ? "AM" : "PM");

            if(isNaN(d.getMinutes())) {
                console.warn("NaN encountered for formatDateTime.\n" +
                    "Arguments: "+jour+" - "+heur);
            }

            return os;
        },

        /**
         * Helper function to format time in H:MM AM/PM
         * @param {String} heur: Time string in format <pre>hh:mm</pre>
         * @returns {String} H:MM (AM|PM) Ex: 2:04 PM
         */
        formatTime: function(heur) {
            var match = heur.match(/(\d\d):(\d\d)/);
            var h = match[1]*1;
            var am = true;
            if (h > 11) {
                am = false;
            }
            if (h > 12) {
                h -= 12;
            }
            return h + ":" + match[2] + ' ' + ((am) ? 'AM' : 'PM');
        },

        /**
         * @todo: Make sure can remove
         */
        indexURL : /^#?([\w\-_]+)$/,
        /**
         * @todo: Make sure can remove
         */
        detailsURL : /^#?([\w\-_]+)[\/\?]([\w\-_%&=]*)$/,
        /**
         * @todo: Make sure can remove
         */
        processableURL : /^#?[\w\-_]+([\/\?][\w\-_%&=]*)?$/,

        /**
         * Utility function to convert from region code to a number used in team ID
         * @param {String} region
         * @returns {String}
         */
        regionToID: function(region) {
            switch(region) {
                case '49':  return '1';
                case '105': return '2';
                case '208': return '4';
                case '253': return '5';
                case '491': return '6';
                default: return this.NO_MAPPING;
            }
        },

        /**
         * Utility function to convert to a region code from the region ID number
         * @param {String} regionID
         * @returns {String}
         */
        regionFromID: function(regionID) {
            switch(regionID) {
                case '1':  return '49';
                case '2': return '105';
                case '4': return '208';
                case '5': return '253';
                case '6': return '491';
                default: return this.NO_MAPPING;
            }
        },

        /**
         * Utility function to convert from region code to a number used in team ID
         * @param {string} division
         * @returns {string}
         */
        divisionToCode: function(division) {
            switch(division) {
                case  "U5": return '8';
                case  "U6": return '7';
                case  "U8": return '6';
                case "U10": return '5';
                case "U12": return '4';
                case "U14": return '3';
                case "U16": return '2';
                case "U19": return '1';
                default: return this.NO_MAPPING;
            }
        },

        /**
         * Utility function to convert from gender a single-letter code used in team ID
         * @param {String} gender
         * @returns {String}
         */
        genderToCode: function(gender) {
            switch(gender) {
                case 'Girls': return 'G';
                case  'Boys': return 'B';
                case  'Coed': return 'C';
                default: return this.NO_MAPPING;
            }
        },

        /**
         * Return value for util conversion functions. Set to match any single character in SQL.
         */
        NO_MAPPING: '_',

        /**
         * Convenience error route handler
         * @param {string|{message: string}} err - Error
         */
        errorMsg: function(err) {
            if(typeof err === 'object') {
                $state.go('error', {errorMsg: err.message});
            } else {
                $state.go('error', {errorMsg: err});
            }
        }
    };
});
