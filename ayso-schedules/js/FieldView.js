var FieldView = {
	type: "fields",
	
	//Could add this for a more descriptive of home region
	//regionLong: ["Stryker Complex, "],
	
	current: null, //Placeholder for rendering functions
	
	svgIDs: ["#fields049", "#fields105", "#fields208",
	           "#fields253", "#fields491", "#fieldsError"],
	           
	svgFiles: ["img/Fields049.svg", "img/Fields105.svg", "img/Fields208.svg",
	           "img/Fields253nomap.svg", "img/Fields491.svg", "img/error.svg"],
	
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
		
		FieldView.current = r;
		
		if(typeof device != 'undefined') {
			var versionMajor = Number(device.version.substr(0,1));
			if(device.platform = "Android" && versionMajor < 4) {
				$('#field-map').on('pageshow', FieldView.showCanvas);
			} else {
				$('#field-map').on('pageshow', FieldView.showSVG);
			}
		} else {
			$('#field-map').on('pageshow', FieldView.showSVG);
		}//*/

		var $page = $( "#field-map" );
		$page.page();
		$.mobile.changePage( $page );
		location.hash = "#fields?"+offset;
		app.currentView = "#fields?"+offset;
	},
	
	showSVG: function() {
		$('canvas').remove();
		$("#svg-dump").load(FieldView.svgFiles[FieldView.current]);
		
		var h = $(window).height() - $('#svg-dump').offset().top;
		var w = $('#field-map').width();
		$('#svg-dump').width(w);
		$('#svg-dump').height(h);
	},
	
	showCanvas: function() {
		var h = $(window).height() - $('canvas').offset().top;
		var w = $('#field-map').width();
		$('canvas').attr('width',w);
		$('canvas').attr('height',h);
		var c = document.getElementById('canvas');
		var ctx = c.getContext('2d');
	
		console.log("Creating canvas for compatability.");
		ctx.drawSvg(FieldView.svgFiles[FieldView.current], 0, 0, w, h);;
		
		$('#svg-dump').remove();
		
		$('#field-map').off('pageshow');
	}
};