/* global describe, it, angular, inject, spyOn */

describe("Factory: SQLite database control", function() {
    "use strict";

    var dao, mockConnection, mockLS;
    beforeEach(function() {
        module('aysoApp');

        mockConnection = {
            openDatabase: jasmine.createSpy('openDatabase')
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
            $provide.value('$cordovaSQLite', mockConnection);
            $provide.value('localStorageService', mockLS);
        });

        inject(function(_SQLite_) {
            dao = _SQLite_;
        });
    });

    it('opens the database', function() {
        dao.openDB();
        expect(mockConnection.openDatabase).toHaveBeenCalled();
        expect(mockConnection.openDatabase).toHaveBeenCalledWith({
            name: "ayso-ks.db",
            location: 2
        }, dao.initConnection, dao.error);
    });

    it('creates the database when not initialized', function() {
        mockLS.set('dbInit',null);
        spyOn(dao, 'createDB');
        dao.initConnection(jasmine.createSpyObj('db',['transaction']));
        expect(dao.createDB).toHaveBeenCalled();
    });

    it("doesn't create the database when initialized", function() {
        mockLS.set('dbInit','A');
        spyOn(dao, 'createDB');
        dao.initConnection(jasmine.createSpyObj('db',['transaction']));
        expect(dao.createDB).not.toHaveBeenCalled();
    });
});
