

angular.module('aysoApp').factory('mockServerResponse', function(Team, GameDetail) {
    "use strict";
    var team1705B = new Team('1706B', 'Smith, John', '(000) 000-0000');
    var team1706B = new Team('1706B', 'Doe, Jane', '(000) 123-4567');

    return {
        "Version": "2015-11-08",
        "Error": "",
        "Games":[
            {
                "ID":"1",
                "Week":"1",
                "Jour":"2015-09-19",
                "Heur":"10:45:00",
                "Divis":"7B",
                "Away":"1705B",
                "Home":"1706B",
                "Field":"049 Field 06B"
            },
            {
                "ID":"2",
                "Week":"2",
                "Jour":"2015-09-26",
                "Heur":"10:45:00",
                "Divis":"7B",
                "Away":"1706B",
                "Home":"1705B",
                "Field":"049 Field 06B"
            },
            {
                "ID":"3",
                "Week":"3",
                "Jour":"2015-10-03",
                "Heur":"10:45:00",
                "Divis":"7B",
                "Away":"1705B",
                "Home":"1706B",
                "Field":"049 Field 06B"
            }
        ],
        "Coaches":[
            {"ID":"22","Divis":"7B","TeamNo":"1705B","Coach":"Smith, John","Phone":"(000) 000-0000"},
            {"ID":"30","Divis":"7B","TeamNo":"1706B","Coach":"Doe, Jane","Phone":"(000) 123-4567"}
        ],
        translated: {
            team1705B: team1705B,
            team1706B: team1706B,
            game1: new GameDetail('1', '2015-09-19', '10:45:00',team1706B,team1705B,'49','06B'),
            game2: new GameDetail('2', '2015-09-26', '10:45:00',team1705B,team1706B,'49','06B'),
            game3: new GameDetail('3', '2015-10-03', '10:45:00',team1706B,team1705B,'49','06B')
        }
    };
});
