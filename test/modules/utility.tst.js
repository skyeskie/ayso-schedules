describe("Utility", function() {
    "use strict";

    var aysoUtil;
    var mockState;
    beforeEach(function() {
        module('aysoApp');

        //Create mock
        mockState = jasmine.createSpyObj('$state', ['go']);

        angular.mock.module(function($provide) {
            $provide.value('$state', mockState);
        });

        inject(function(_aysoUtil_) {
            aysoUtil = _aysoUtil_;
        });
    });

    describe("configuration data", function() {
        it("has a description for each region code", function() {
            expect(aysoUtil.regions.length).toBe(aysoUtil.regionsLong.length);
        });

        it("has twelve months", function() {
            expect(aysoUtil.months.length).toBe(12);
        });

        it("has at least one region", function() {
            expect(aysoUtil.regions.length).toBeGreaterThan(0);
        });

        it("has at least one division", function() {
            expect(aysoUtil.divisions.length).toBeGreaterThan(0);
        });
    });

    describe("date functions", function() {
        it("converts a valid date", function() {
            expect(aysoUtil.formatDate("2015-05-30")).toBe("May 30");
        });

        it("handle bad timestamps");

        it("converts a valid date time", function() {
            expect(aysoUtil.formatDateTime("2015-05-30", "5:00 pm")).toBe("May 30, 5:00 PM");
        });

        it("converts a valid time", function() {
            expect(aysoUtil.formatTime("05:00")).toBe("5:00 AM");
            expect(aysoUtil.formatTime("17:00")).toBe("5:00 PM");
        });
    });

    describe("region conversion", function() {
        it("is reversible", function() {
            expect(aysoUtil.regionToID(aysoUtil.regionFromID('1'))).toBe('1');
            expect(aysoUtil.regionToID(aysoUtil.regionFromID('2'))).toBe('2');
            expect(aysoUtil.regionToID(aysoUtil.regionFromID('3'))).toBe(aysoUtil.NO_MAPPING);
            expect(aysoUtil.regionToID(aysoUtil.regionFromID('4'))).toBe('4');
            expect(aysoUtil.regionToID(aysoUtil.regionFromID('5'))).toBe('5');
            expect(aysoUtil.regionToID(aysoUtil.regionFromID('6'))).toBe('6');
            expect(aysoUtil.regionToID(aysoUtil.regionFromID(null))).toBe(aysoUtil.NO_MAPPING);
        });
    });

    describe("division conversion", function() {
        it("handles highest", function() {
            expect(aysoUtil.divisionToCode('U5')).toBe('8');
        });

        it("handles lowest", function() {
            expect(aysoUtil.divisionToCode('U19')).toBe('1');
        });
    });

    describe("name switching", function() {
        it("handles last, first", function() {
            expect(aysoUtil.nameSwitch('Doe, John')).toBe('John Doe');
        });

        it("handles single name", function() {
            expect(aysoUtil.nameSwitch('Bob')).toBe('Bob');
        });

        it("handles two commas", function() {
            expect(aysoUtil.nameSwitch("Doe, John, Huh?")).toBe('John, Huh? Doe');
        });
    });

    describe("Error handling", function() {
        it("exists", function() {
            expect(mockState).toBeDefined();
            expect(mockState.go).toBeDefined();
        });

        it("with object parameter", function() {
            aysoUtil.errorMsg({message: 'Foo'});
            expect(mockState.go).toHaveBeenCalledWith('error', {errorMsg: 'Foo'});
        });

        it("with string parameter", function() {
            aysoUtil.errorMsg('Bar');
            expect(mockState.go).toHaveBeenCalledWith('error', {errorMsg: 'Bar'});
        });
    });
});
