/* global describe, it, angular, inject, spyOn */

describe("Service: DataControl", function() {
    "use strict";

    var dc, mockLS, mockDao, $httpBackend;

    beforeEach(function() {
        module('aysoApp');

        mockLS = {
            keys: { dbInit: 'A' },
            get: function(key) {
                return mockLS.keys[key];
            },
            set: function(key, val) {
                mockLS.keys[key] = val;
            }
        };

        mockDao = jasmine.createSpyObj('SchedulesDAO', ['putGames', 'putCoaches']);

        //$http, SchedulesDAO, localStorageService
        angular.mock.module(function($provide) {
            $provide.value('localStorageService', mockLS);
            $provide.value('SchedulesDAO', mockDao);
        });

        inject(function(_DataControl_, $injector) {
            dc = _DataControl_;
            $httpBackend = $injector.get('$httpBackend');
            //Ignore default routing
            $httpBackend.when('GET', 'views/init.html').respond('');
        });
    });

    //afterEach(function() {
    //    $httpBackend.verifyNoOutstandingExpectation();
    //    $httpBackend.verifyNoOutstandingRequest();
    //});

    it('should persist last update', function() {
        dc.setLastUpdate("Foo");
        expect(dc.getLastUpdate()).toEqual("Foo");
    });

    it("should default to '' when no last update", function() {
        expect(dc.getLastUpdate()).toEqual('');
    });

    it("should fail response when no Error field in data", function() {
        spyOn(dc, "httpError");
        expect(dc.checkResponse({data: {}})).toBeFalse();
        expect(dc.httpError).toHaveBeenCalledWith('Response is unrecognized format');
    });

    it("should fail when error field is set", function() {
        spyOn(dc, "httpError");
        expect(dc.checkResponse({data: { Error: 'Foo'}})).toBeFalse();
        expect(dc.httpError).toHaveBeenCalledWith('Foo');
    });

    it("should pass data check with blank Error", function() {
        expect(dc.checkResponse({data: { Error: ''}})).toBeTrue();
    });

    it("injectData");
    it("updateData");
    it("fullDataRefresh");
});
