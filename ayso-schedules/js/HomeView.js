var HomeView = {
	type: "index",
	
	pageContainer: "#index",
	
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