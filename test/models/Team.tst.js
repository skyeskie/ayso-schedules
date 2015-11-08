
describe("Model: Team", function() {
    "use strict";

    var Team;
    beforeEach(function() {
        module('aysoApp');

        inject(function (_Team_) {
            Team = _Team_;
        });
    });

    it('creates a team object', function() {
        var t = new Team('code', 'coach', 'coachTel');
        expect(t.code).toEqual('code');
        expect(t.coach).toEqual('coach');
        expect(t.coachTel).toEqual('coachTel');
    });
});
