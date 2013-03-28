var SettingsView = {
	type: "settings",
	
	showIndex: function() {
		//Set current region
		$("#settings #lastUpdate").html(DataControl.getLastUpdate());
		$("#select-region").val(DataControl.getRegion());
		$('#update-result').html('');
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
		$.mobile.changePage( "#setup" );
	}
};

app.routeAdd(
	[
		{"#settings" : { handler: "hSettings", events: "bs" }}
	],
	{
		hSettings: function(eventType, matchObj, ui, page, evt) {
			SettingsView.showIndex();
		}
	}
);