describe("Remote URL", function() {
    "use strict";

    var $http, dao, dc;
    beforeEach(function() {
        module('aysoApp');
        inject(function (_$http_, SchedulesDAO, DataControl) {
            $http = _$http_;
            dao = SchedulesDAO;
            dc = DataControl;
        });
    });

    it("can connect to the remote URI", function(done) {
        $http.post('http://aysoks.org/app/json.php5').then(
            function(response) {
                expect(response.status).toEqual('200');
                done();
            },
            done.fail
        );
    });

    it("can load the remote file", function(done) {
        dc.fullDataRefresh();
    });
});
