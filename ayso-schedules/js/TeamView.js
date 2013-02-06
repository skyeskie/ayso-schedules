var TeamView = {
	type: "team",
	
	regions: Array("49", "105", "208", "253", "491"),
	divisions: Array("U6", "U8", "U10", "U12", "U14", "U19"),
	
	showIndex: function() {
		$('#team .results').html("Loading...");
		
		$('#team .ui-btn-active').removeClass('ui-btn-active');
		
		$('#team .divis-select1').data('active', null);
		$('#team .gender-select').data('active', null);
		$('#team .region-select').data('active', null);
		TeamView.generateListing();

		app.currentView = this.type;
		
		var $page = $( "#team" );
		$page.page();
		$.mobile.changePage( $page );
		window.hash = "team";
	},
	
	regionUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('ui-btn-active')) {
			$target.removeClass('ui-btn-active');
			$('#team .region-select').data('active', null);
		} else {
			$('#team .region-select .ui-btn-active').removeClass('ui-btn-active');
			$target.addClass('ui-btn-active');
			$('#team .region-select').data('active', $target.text());
		}
		TeamView.generateListing();
	},
	
	divisionUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('ui-btn-active')) {
			$target.removeClass('ui-btn-active');
			$('#team .divis-select1').data('active', null);
		} else {
			$('#team .divis-select1 .ui-btn-active').removeClass('ui-btn-active');
			$('#team .divis-select2 .ui-btn-active').removeClass('ui-btn-active');
			$target.addClass('ui-btn-active');
			$('#team .divis-select1').data('active', $target.text());
		}
		TeamView.generateListing();
	},
	
	genderUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('ui-btn-active')) {
			$('#team .gender-select').data('active', null);
			$('#team .gender-select .ui-btn-active').removeClass('ui-btn-active');
		} else {
			$('#team .gender-select .ui-btn-active').removeClass('ui-btn-active');
			$target.addClass('ui-btn-active');
			$('#team .gender-select').data('active', $target.text());
		}
		TeamView.generateListing();
	},
	
	generateListing: function() {
		app.db.findTeams(this.updateListing,
				$('#team .region-select').data('active'),
				$('#team .divis-select1').data('active'),
				$('#team .gender-select').data('active'));
	},
	
	updateListing: function(rows) {
		$("#team .results").empty();
		if(rows.length==0) {
			$("#team .results").append("No teams found.");
		}
		
		for(var i=0; i<rows.length; ++i) {
			var val = rows.item(i).Home;
			$("#team .results").append("<div><a href='index.html#team?"+val+"'>"+val+"</a></div>");
		}
		$("#team").page();
	},
	
	teamRegEx: /^(\d)(\d)(\d{1,2})([GBC])$/i,
	
	showDetail: function(team) {
		$('#team-detail .listing').empty();
		$('#team-detail h2 span').html(team);
		$('#team-detail ul').html("<li><em>Loading...</em></li>");
		
		app.db.findByTeam(team, function(rows) {
			$('#team-detail ul').replaceWith(
				'<ul data-role="listview" data-theme="c" data-inset="true"></ul>'
			);
			
			if(rows.length==0) {
				$('#team-detail ul').html("<li>No results</li>");
			}
			
			for(var i=0; i<rows.length; ++i) {
				var game = rows.item(i);
				
				var datetime = game.Jour.replace(/^\d{4}\-0?/, "");
				var opponent, field;
				if(game.Opponent=="-") {
					opponent = "Bye";
					field = "&nbsp;";
				} else {
					datetime += " &nbsp;&nbsp;" + game.Heur.replace(/:00$/, "");
					opponent = game.HA+" "+game.Opponent;
					field = "Region " + game.Field;
				}
				
				$('#team-detail ul').append("<li><a href='#game?" + game.ID + "'>" +
					"<h3 class='width50'>"+datetime+"</h3>" +
					"<h3 class='width50'>"+opponent+"</h3>" +
					"<p>"+field+"</p>" +
				"</a></li>");
			}
			
			$('#team-detail ul').listview();
		});
		
		app.currentView = this.type;
		
		var $page = $( "#team-detail" );
		$page.page();
		$.mobile.changePage( $page );
		window.hash = "team?" + team;
	}
};