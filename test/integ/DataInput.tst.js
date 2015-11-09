describe("Load JSON into database", function() {
    "use strict";
    var $httpBackend, dc, dao, GameDetail, Team, mockExpect;
    beforeAll(function() {
        module('aysoApp');
        //Intercept httpBackend to return JSON object
        //JSON object defined in RemoteSample.mock.js as Angular factory
        inject(function(_DataControl_, $injector, mockServerResponse, SchedulesDAO, _GameDetail_, _Team_) {
            dc = _DataControl_;
            dao = SchedulesDAO;
            GameDetail = _GameDetail_;
            Team = _Team_;
            mockExpect = mockServerResponse.translated;

            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.whenGET('views/init.html').respond('');
            $httpBackend.expectPOST("http://aysoks.org/app/json.php5").respond(mockServerResponse);
        });

        dc.fullDataRefresh();
    });

    //run SQL tests on end database
    it("stores game 1", function(done) {
        dao.getGameDetail("1").then(function(game) {
            expect(game).toEqual(mockExpect.translated.game1);
            done();
        }, done.fail);
    });

    it("stores game 2", function(done) {
        dao.getGameDetail("1").then(function(game) {
            expect(game).toEqual(mockExpect.translated.game2);
            done();
        }, done.fail);
    });

    it("stores game 3", function(done) {
        dao.getGameDetail("3").then(function(game) {
            expect(game).toEqual(mockExpect.translated.game3);
            done();
        }, done.fail);
    });

    //query local storage
    it("creates week cache correctly", function() {
        expect(dao.getWeekStarts()).toEqual('2015-09-19,2015-09-26,2015-10-03');
        expect(dao.getNumWeeks()).toEqual(3);
    });

    it("stores the data version", function() {
        expect(dc.getLastUpdate()).toEqual('2015-11-08');
    });
});
