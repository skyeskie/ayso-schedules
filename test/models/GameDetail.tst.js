describe("Model: GameDetail", function () {
    "use strict";

    var GameDetail, Team, bye, fooTeam, barTeam;
    beforeEach(function () {
        module('aysoApp');

        inject(function (_GameDetail_, _Team_) {
            GameDetail = _GameDetail_;
            Team = _Team_;

            bye = new Team('-','','');
            fooTeam = new Team('Foo', 'Foo', 'Foo');
            barTeam = new Team('Bar', 'Bar', 'Bar');
        });
    });

    it("can recognize a home bye", function() {
        var homeBye = new GameDetail(1, 1, 1, fooTeam, bye, 1, 1);
        expect(homeBye.isBye()).toBe(true);
    });

    it("can recognize an away bye", function() {
        var awayBye = new GameDetail(1,1,1,bye,fooTeam,1,1);
        expect(awayBye.isBye()).toBe(true);
    });

    it("returns no bye when two teams", function() {
        var noBye = new GameDetail(1,1,1,fooTeam,barTeam,1,1);
        expect(noBye.isBye()).toBe(false);
    });

    it("can return an opponent by object", function() {
        var g = new GameDetail(1,1,1,fooTeam,barTeam,1,1);
        expect(g.getOpponent(fooTeam)).toBe(barTeam);
    });

    it("can return an opponent by name", function() {
        var g = new GameDetail(1,1,1,fooTeam,barTeam,1,1);
        expect(g.getOpponent(fooTeam.code)).toBe(barTeam);
    });

    it("throws error on invalid input", function() {
        var g = new GameDetail(1,1,1,fooTeam,barTeam,1,1);
        //Need to bind arguments rather than direct call
        // because toThrow expects Fn in expect()
        expect(g.getOpponent.bind(12)).toThrow();
        expect(g.getOpponent.bind({foo: "Bar"})).toThrow();
        expect(g.getOpponent.bind("Baz")).toThrow();
    });

    it("processes fromSql correctly", function() {
        var properties = ['Week', 'Jour', 'Heur',
            'Home', 'HomeCoach', 'HomeCoachPhone',
            'Away', 'AwayCoach', 'AwayCoachPhone'];

        var sqlObj = {'Field': '42 Field Foo'};
        properties.forEach(function(v) {
            sqlObj[v] = v;
        });

        var sqlResult = {
            length: 1,
            item: function() { return sqlObj; }
        };

        //SQLite has the result in an array
        var g = GameDetail.fromSql(sqlResult);
        var g2 = new GameDetail('Week', 'Jour', 'Heur',
            new Team('Home', 'HomeCoach', 'HomeCoachPhone'),
            new Team('Away', 'AwayCoach', 'AwayCoachPhone'),
            '42',
            'Foo'
        );
        expect(g).toEqual(g2);
    });

    it("throws an error on bad input", function() {
        expect(GameDetail.fromSql.bind({ length: 0 })).toThrow();
        expect(GameDetail.fromSql.bind({ length: 3 })).toThrow();
        expect(GameDetail.fromSql.bind(25)).toThrow();
    });
});
