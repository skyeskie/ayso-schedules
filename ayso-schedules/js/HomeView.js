var HomeView = {
	type: "index",
	
	pageContainer: "#index",
	
	showIndex: function() {
		HomeView.printView();
	},
	
	printView: function() {
		console.log("Running HomeView.printView()");
		
		var $page = $( this.pageContainer);
		
		console.log("Printing index");
		$page.page();
		
		$.mobile.changePage( $page );
		app.currentView = "#index";
		location.hash = "#index";
	}
};

var ScheduleHome = {
	type: "schedules",
	
	showIndex: function() {
		var $page = $( "#schedules" );
		$page.page();
		$.mobile.changePage( $page );
		app.currentView = "#schedules";
		location.hash = "#schedules";
	}
};