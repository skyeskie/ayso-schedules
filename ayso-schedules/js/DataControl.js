var DataControl =  function(successCallback, errorCallback) {
	this.isAppSetup = function() {
		var init = window.localStorage.getItem("init");
		
		return (init && init=="T");
	};
	
	this.downloadInitialData = function() {
		console.log("Running initial data setup");
		//Call AJAX
		//TODO set data format
		//TODO setup communication
		
		//Inject into DB
		app.db.db.transaction(
			function(tx) {
				//Since initial data, we need to make sure empty so no duplicates
				tx.executeSql('DELETE FROM games WHERE 1');
				app.db.addSampleData(tx);
			},
			
			function(error) {
                console.log('Transaction error: ' + error);
                if (errorCallback) errorCallback();
            },
			
            function() {
                console.log('Transaction success');
                if (successCallback) successCallback();
            }
        );
		
		
		//Cache certain data (maxWeeks, week#/date correlation, lastUpdate)
		
		//Cache max number of weeks
		app.db.db.transaction(
    		function(tx) {
    			var sql = "SELECT MAX(Week) AS nweeks FROM games LIMIT 1";
    			tx.executeSql(sql, [],
    				function(tx, results) {
    					if(results.rows.length==0) {
    						console.error("Error: could not determine max weeks.");
    						window.localStorage.setItem("maxWeeks", 9); //Default
    					}
    					
    					console.log("Setting maxWeeks");
    					window.localStorage.setItem("maxWeeks", results.rows.item(0).nweeks);
    				}
    			);
    		},
    		app.db.transactionError
    	);
		
		//TODO This should be set to a result from the AJAX query
		window.localStorage.setItem("lastUpdate", "12345");
		
		window.localStorage.setItem("init","T");
	};
	
	this.updateData = function() {
		console.log("Calling data update");
		//Call AJAX (with lastUpdate)
		
		//Inject changes into DB
		
		//Update lastUpdate
	};
	
	this.getMaxWeeks = function() {
		return window.localStorage.getItem("maxWeeks");
	};
	
	this.getRegion = function() {
		return window.localStorage.getItem("region");
	};
	
};