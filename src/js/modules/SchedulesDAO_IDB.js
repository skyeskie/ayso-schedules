/**
 * @ngdoc service
 * @name SchedulesDAO_IDB
 * @desc IndexedDB backend for {@link SchedulesDAO}
 * @implements SchedulesDAO
 *
 * @todo: Everything...
 */

angular.module('aysoApp').service("SchedulesDAO_IDB", function(ConfigDAO, IndexedDB, WeekCache, localStorageService, aysoUtil, $q, Game, Team, GameDetail) {
    "use strict";
    var ls = localStorageService;
    var db = IndexedDB.getDatabase();
    var cfg = ConfigDAO;



});
