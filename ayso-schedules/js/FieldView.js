var FieldView = {
	type: "fields",
	
	//Could add this for a more descriptive of home region
	//regionLong: ["Stryker Complex, "],
	
	svgFiles: ["img/Fields049.svg", "img/Fields105.svg", "img/Fields208.svg",
	           "img/Fields253.svg", "img/Fields491.svg", "img/error.svg"],
	
	showIndex: function() {
		$("#fields .listing").empty();
		var myregion = DataControl.getRegion();
		for(var i=0; i< app.regions.length; ++i) {
			if(app.regions[i] == myregion) {
				$("#fields .listing").prepend("<div class='full ui-bar-c'>" +
						"<h2>Region "+app.regions[i]+" - " +
						""+app.regionsLong[i]+"</h2>" +
						"<a data-role='button' href='#map?"+app.regions[i]+"'>Directions</a>" +
						"<a data-role='button' href='#fields?"+app.regions[i]+"'>Field Map</a>" +
					"</div>");
			} else {
				$("#fields .listing").append("<div class='width50 ui-bar-c'>" +
					"<h2>Region "+app.regions[i]+"</h2>"+
					"<p>"+app.regionsLong[i]+"</p>" +
					"<a data-role='button' href='#map?"+app.regions[i]+"'>Map</a>" +
					"<a data-role='button' href='#fields?"+app.regions[i]+"'>Fields</a>" +
				"</div>");
			}
		}
		
		//Change page
		var $page = $( "#fields" );
		$page.page();
		$( "#fields .listing" ).trigger( "create" );
		$.mobile.changePage( $page );
		location.hash = "#fields";
		app.currentView = "#fields";
	},

	showDetail: function(offset) {
		var r = null;
		for(var i=0; i<app.regions.length; ++i) {
			if(offset == app.regions[i]) r = i;
		}
		
		if(r==null) {
			r = 5; //Error
		}
		
		console.log("<embed src='" +
				this.svgFiles[r] +
				"' type='image/svg+xml' />");
		
		$("#field-map embed").attr("src", this.svgFiles[r]);

		var $page = $( "#field-map" );
		$page.page();
		$.mobile.changePage( $page );
		location.hash = "#fields?"+offset;
		app.currentView = "#fields?"+offset;
	}
};