/* global angular, aysoApp */

aysoApp.service('aysoUtil', function() {
    "use strict";

    return {
        /**
         * Region information for the app.
         */
        regions : [ "49", "105", "208", "253", "491" ],
        divisions : [ "U5", "U6", "U8", "U10", "U12", "U14", "U19" ],
        regionsLong : [ "Stryker", "Southview", "West Wichita", "Valley Center",
            "Clearwater" ],

        /**
         * Switches name around from Last, First to First Last
         * @param name in "Last, First" format
         * @return String Name in "First Last" format
         *
         * TODO: Convert this into a filter
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
         * @param jour Date string in YYYY-MM-DD
         * @returns Date in format "<ShortMonth> <Day>" (Eg: Jan 4)
         */
        formatDate : function(jour) {
            var match = jour.match(/(\d{4})\-(\d{1,2})\-(\d{1,2})/);
            var os = this.months[Number(match[2])-1];
            os += " " + match[3];
            return os;
        },

        /**
         * Helper function to format the date and time
         * @param jour Date string
         * @param heur Time string
         * The two are combined with a space and fed into Date() c'tor
         * @returns Date in format "Jan 4, 2:04 PM"
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
         * @param heur: Time string in format ##:##
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

        indexURL : /^#?([\w\-_]+)$/,
        detailsURL : /^#?([\w\-_]+)[\/\?]([\w\-_%&=]*)$/,

        //Combination of above two for jQuery hook
        processableURL : /^#?[\w\-_]+([\/\?][\w\-_%&=]*)?$/,

        regionToID: function(region) {
            switch(region) {
                case '49':  return '1';
                case '105': return '2';
                case '208': return '4';
                case '253': return '5';
                case '491': return '6';
                default: return null;
            }
        },

        regionFromID: function(regionID) {
            switch(regionID) {
                case '1':  return '49';
                case '2': return '105';
                case '4': return '208';
                case '5': return '253';
                case '6': return '491';
                default: return null;
            }
        },

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
                default: return null;
            }
        }
    };
});
