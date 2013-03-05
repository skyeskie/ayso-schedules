var SettingsView = {
	type: "settings",
	
	showIndex: function() {
		//Set current region
		$("#settings #lastUpdate").html(DataControl.getLastUpdate());
		$("#select-region").val(DataControl.getRegion());
		
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
		$.post(this.remoteURL, { lastUpdate: DataControl.getLastUpdate() },
				DataControl.updateFinish, "json")
			.fail(function(error) {
				console.error("Error connecting to remote server: "+error);
			})
			.success(function() {
				$("#settings #lastUpdate").html(DataControl.getLastUpdate());
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
		var $page = $( "#setup" );
		$page.page();
		$.mobile.changePage( $page );
		location.hash = "#setup";
		app.currentView = "#setup";
	}
};