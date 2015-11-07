angular.module('aysoApp').factory('Team', function(){
    "use strict";

    function Team(id, coach, phone) {
        this.code = id;
        this.coach = coach;
        this.coachTel = phone;
    }

    return Team;
});
