var MapView = {
	type: "map",
	
	map: null,
	
	coords: {
		r49:  {lat: 37.737437, lon: -97.213361, content: "Region 49"},
		r105: {lat: 37.611328, lon: -97.367567, content: "Region 105"},
		r208: {lat: 37.714016, lon: -97.424741, content: "Region 208"},
		r253: {lat: 37.760563, lon: -97.373950, content: "Region 253"},
		r491: {lat: 37.503879, lon: -97.490616, content: "Region 491"}
	},
	
	showIndex: function() {
		this.showDetail(DataControl.getRegion());
	},
	
	showDetail: function(region) {
		if(MapView.map==null) MapView.init(region);
		else MapView.updateMap(region);
		
		var $page = $( "#map" );
		$page.page();
		$.mobile.changePage( $page );
		location.hash = "#map?" + region;
		app.currentView = "#map?" + region;
	},
	
	init: function(region) {
		var h = $(document).height() - $('#map .pageheader').height();
		console.log($(document).height() + " - " + $('#map .pageheader').height() + " = " + h);
		$('#map_canvas').height(h);
		var center = MapView.coords["r"+region];
		$('#map_canvas').gmap({
			'center' : new google.maps.LatLng(center.lat, center.lon),
			'zoom' : 13
		});
		
		$.each( MapView.coords, function(i, marker) {
			$('#map_canvas').gmap('addMarker', { 
				'position': new google.maps.LatLng(marker.lat, marker.lon),
				'map': MapView.map,
				'title': marker.content
			}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', { 'content': marker.content }, this);
			});
		});
		
		MapView.map = $("#map_canvas");
		
		$('#map').live("pageshow", function() {
			console.log("Refresh map");
		    $('#map_canvas').gmap('refresh');
		});
	},
	
	updateMap: function(region) {
		var marker = MapView.coords["r"+region];
		console.log("Changing to #map: ");
		console.log(MapView.coords["r"+region]);
		
		$('#map_canvas').gmap({
			'center' : new google.maps.LatLng(marker.lat, marker.lon),
			'zoom' : 13
		});
	}
};