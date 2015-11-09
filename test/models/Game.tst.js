
describe("Model: Game", function() {
    "use strict";

    var Game;
    beforeEach(function() {
        module('aysoApp');

        inject(function (_Game_) {
            Game = _Game_;
        });
    });

    it("can create a game object", function() {
        var g = new Game(1, 2, 3, 4, 5, 6);
        expect(g.id).toEqual(1);
        expect(g.day).toEqual(2);
        expect(g.hour).toEqual(3);
        expect(g.field).toEqual(4);
        expect(g.home).toEqual(5);
        expect(g.away).toEqual(6);
    });

    it("can recognize a bye", function() {
        var g = new Game(1,1,1,1,'-','foo');
        expect(g.isBye()).toBe(true);
        g.home = 'foo';
        expect(g.isBye()).toBe(false);
        g.away = '-';
        expect(g.isBye()).toBe(true);
    });

    it("can create a game object from SQL", function() {
        var row = {
            ID: 'id',
            Jour: 'jour',
            Heur: 'heur',
            Field: 'field',
            Home: 'home',
            Away: 'away'
        };
        var g = Game.fromSql(row);
        expect(g.id).toEqual('id');
        expect(g.day).toEqual('jour');
        expect(g.hour).toEqual('heur');
        expect(g.field).toEqual('field');
        expect(g.home).toEqual('home');
        expect(g.away).toEqual('away');
    });
});
