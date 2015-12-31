angular.module('aysoApp').config(function($indexedDBProvider) {
    "use strict";

    $indexedDBProvider.connection('AysoKS')
        .upgradeDatabase(1, function(event, db, tx){
            var games = db.createObjectStore('games', {
                keyPath: "id",
                autoIncrement: false
            });

            games.createIndex("week", "week", { "multiEntry": true});
            games.createIndex("timestamp", "timestamp", { "multiEntry": true});
            games.createIndex("divis", "divis", { "multiEntry": true});
            games.createIndex("homeID", "homeID", { "multiEntry": true});
            games.createIndex("awayID", "awayID", { "multiEntry": true});

            var teams = db.createObjectStore('teams', {
                keyPath: "team",
                autoIncrement: false
            });
        });
});
