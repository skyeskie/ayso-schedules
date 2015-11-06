/* global describe, it, angular, inject, spyOn */

describe("Service: SchedulesDAO", function() {
    "use strict";

    var dao, mockDB, mockLS;
    beforeEach(function() {
        module('aysoApp');

        //Create mocks
        mockDB = {
            transaction: jasmine.createSpy('transaction'),
            readTransaction: jasmine.createSpy('readTransaction')
        };

        mockLS = {
            keys: { dbInit: 'A' },
            get: function(key) {
                return mockLS.keys[key];
            },
            set: function(key, val) {
                mockLS.keys[key] = val;
            }
        };

        angular.mock.module(function($provide) {
            $provide.value('SQLite', mockDB);
            $provide.value('localStorageService', mockLS);
        });

        inject(function(_SchedulesDAO_) {
            dao = _SchedulesDAO_;
        });
    });

    describe('weeks cache', function() {
        it('retrieves num weeks that is set', function() {
            dao.setMaxWeeks(10);
            expect(dao.getNumWeeks()).toEqual(10);
        });

        it('returns array for weekStarts', function() {
            mockLS.set('weekStarts', 'Foo,Bar,Baz');
            expect(dao.getWeekStarts()).toEqual(['Foo', 'Bar', 'Baz']);
        });

        it('handles single item for weekStarts', function() {
            mockLS.set('weekStarts', 'Foo');
            expect(dao.getWeekStarts()).toEqual(['Foo']);
        });

        it('returns the current week', function() {
            mockLS.set('weekStarts', '2000-01-01,2000-02-02,3000-03-03');
            expect(dao.getCurrentWeek()).toEqual(2);
        });

        it('returns last week when after season', function() {
            mockLS.set('weekStarts', '2000-01-01,2000-02-02,2000-03-03');
            expect(dao.getCurrentWeek()).toEqual(3);
        });

        it('returns first week when before season', function() {
            mockLS.set('weekStarts', '3000-01-01,3000-02-02,3000-03-03');
            expect(dao.getCurrentWeek()).toEqual(1);
        });

        it('defaults to 1 with no cache', function() {
            mockLS.set('weekStarts', '');
            expect(dao.getCurrentWeek()).toEqual(1);
        });
    });
});
