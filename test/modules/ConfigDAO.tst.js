describe("Service: aysoApp.ConfigDAO", function() {
    "use strict";

    var service;
    beforeEach(function() {
        module('aysoApp');
        inject(function (_ConfigDAO_) {
            service = _ConfigDAO_;
        });
        service.clearSavedTeams();
        service.setRegion('');
    });

    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });

    it('should start with no saved teams', function() {
        expect(service.getSavedTeams().length).toBe(0);
    });

    it('should return the same value saved', function() {
        service.saveTeam("Foo");
        expect(service.getSavedTeams().length).toBe(1);
        expect(service.getSavedTeams()).toContain("Foo");
    });

    it('should save two distinct values', function() {
        service.saveTeam("Foo").saveTeam("Bar");
        expect(service.getSavedTeams()).toEqual(["Foo", "Bar"]);
    });

    it('should not save duplicate values', function() {
        service.saveTeam("Foo")
            .saveTeam("Foo");
        expect(service.getSavedTeams()).toEqual(["Foo"]);
        service.saveTeam("Bar")
            .saveTeam("Foo");
        expect(service.getSavedTeams()).toEqual(["Foo", "Bar"]);
    });

    it('should remove saved teams', function() {
        service.saveTeam("Foo")
            .saveTeam("Bar")
            .saveTeam("Baz")
            .unSaveTeam("Bar");
        expect(service.getSavedTeams()).toEqual(["Foo", "Baz"]);
    });

    it('should test existence', function() {
        expect(service.isTeamSaved("Foo")).toBe(false);
        service.saveTeam("Foo");
        expect(service.isTeamSaved("Foo")).toBe(true);
        expect(service.isTeamSaved("Bar")).toBe(false);
    });

    it('should clear saved teams correctly', function() {
        service.saveTeam("Foo")
            .saveTeam("Bar")
            .saveTeam("Baz");
        expect(service.getSavedTeams()).toEqual(["Foo", "Bar", "Baz"]);
        service.clearSavedTeams();
        expect(service.getSavedTeams()).toEqual([]);
    });

    it('should default to no region', function() {
        expect(service.getRegion()).toEqual('');
    });

    it('should save region', function() {
        service.setRegion('Foo');
        expect(service.getRegion()).toBe('Foo');
    });
});
