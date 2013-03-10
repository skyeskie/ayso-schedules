var SettingsView = {
	type: "settings",
	
	showIndex: function() {
		//Set current region
		$("#settings #lastUpdate").html(DataControl.getLastUpdate());
		$("#select-region").val(DataControl.getRegion());
		$('#update-result').html('');
		
		//Change page
		var $page = $( "#settings" );
		$page.page();
		$.mobile.changePage( $page );
		location.hash = "#settings";
		app.currentView = "#settings";
	},
	
	regionUpdate: function() {
		console.log("Region change!");
		window.localStorage.setItem("region", $("#select-region option:selected").val());
	},
	
	refresh: function() {
		$.post(DataControl.remoteURL, { lastUpdate: DataControl.getLastUpdate() },
				DataControl.updateFinish, "json")
			.fail(function(error) {
				console.error("Error connecting to remote server: "+error);
				$('#update-result').html('Error connecting to remote server');
			})
			.success(function() {
				$("#settings #lastUpdate").html(DataControl.getLastUpdate());
				$('#update-result').html('Update successful');
			});
	},
	
	doReset: function() {
		//TODO Add dialog confirmation
		
		app.reset();
		app.db.removeAll();
        window.localStorage.removeItem("region");
        window.localStorage.removeItem("savedTeams");
        window.localStorage.removeItem("maxWeeks");
        window.localStorage.removeItem("lastUpdate");
        window.localStorage.removeItem("weekStart");
        
        //Change page
        app.db.initializeDatabase(DataControl.downloadInitialData, DataControl.setupError);
		var $page = $( "#setup" );
		$page.page();
		$.mobile.changePage( $page );
		location.hash = "#setup";
		app.currentView = "#setup";
	}
};