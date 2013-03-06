var CancelView = {
	type: "twitter",
	
	showIndex: function() {
		if(!document.getElementById("twitter-wjs")) {
			var js= document.createElement("script");
			js.id="twitter-wjs";
			js.src="https://platform.twitter.com/widgets.js";
			$("#twitter .messages").replaceWith(js);
		}
		
		var $page = $("#twitter");
		
		console.log("Printing index");
		$page.page();
		
		$.mobile.changePage( $page );
		app.currentView = "#twitter";
		location.hash = "#twitter";
	}
};