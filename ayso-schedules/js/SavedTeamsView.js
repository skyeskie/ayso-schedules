var SavedTeamsView = {
	type: "favorites",
	buttonSelector: null,
	
	/*
	 * Code for the old button toggle.
	 * Will probably switch back to this code (or very similar)
	 */
	/*
	favoriteToggle: function(triggerObject) {
		var $target = $(SavedTeamsView.buttonSelector);
		
		if($target.hasClass('active-button')) {
			DataControl.unSaveTeam($target.data("team"));
			$target.removeClass('active-button');
			$target.buttonMarkup({ theme: "c" });
		} else {
			DataControl.saveTeam($target.data("team"));
			$target.addClass('active-button');
			$target.buttonMarkup({ theme: "b" });
		}
		$target.button('refresh');
	},
	
	favoriteInit: function(button, team) {
		$(button).data("team", team);
		$(button).button();
		if(DataControl.isTeamSaved(team)) {
			$(button).addClass('active-button');
			$(button).buttonMarkup({ theme: "b" });
		} else {
			$(button).removeClass('active-button');
			$(button).buttonMarkup({ theme: "c" });
		}
		$(button).button('refresh');
		this.buttonSelector =  button;
	},
	*/
	
	favoriteToggle: function(triggerObject) {
		var state = $("#flip-team")[0].selectedIndex;
		var team = $("#flip-team").data("team");
		if(state==1) {
			DataControl.saveTeam(team);
			console.log("Saving team");
		} else {
			DataControl.unSaveTeam(team);
			console.log("Unsaving team");
		}
	},
	
	favoriteInit: function(flip, team) {
		var flipper = $(flip);
		flipper.data("team", team);
		flipper.slider();
		
		if(DataControl.isTeamSaved(team)) {
			flipper[0].selectedIndex = 1;
		} else {
			flipper[0].selectedIndex = 0;
		}
		flipper.slider("refresh");
	},
	
	showIndex: function() {
		var $page = $( "#favorites" );
		
		//Populate teams listing
		$("#favorites .myteams").empty();
		DataControl.populateSavedTeams();
		for(var i=0; i<DataControl.savedTeams.length; ++i) {
			var team = DataControl.savedTeams[i];
			if(team=="") continue;
			$("#favorites .myteams").append(
				"<a href='#team?" + team +
				"' data-inline='true' data-role='button'>"
					+ team + "</a>"
			);
		}
		
		//Apply jQuery styling
		$("#favorites .myteams").trigger("create");
		
		if(DataControl.savedTeams.length == 0) {
			$("#favorites .myteams").html(
				"<div class='ui-theme-e'>" +
				"<h2>No Teams</h2>" +
				"<p>In order to use this view, please 'Favorite' teams by " +
				"finding them with the 'Find Team' option then marking them " +
				"as a favorite.</p>" +
				"<a href='#team' data-role='button'>Find Team</a>"
			);
			
			$page.page();
			$.mobile.changePage( $page );
			window.hash = "favorites";
			
			return;
		}
		
		//Populate games listing
		$('#favorites ul').append("<li>Loading...</li>");
		app.db.findByFavorites(this.updateGamesList);
		
		$page.page();
		$.mobile.changePage( $page );
		window.hash = "#favorites";
		app.currentView = "#favorites";
	},
	
	showDetail: function(offset) {
		this.showIndex();
	},
	
	updateGamesList: function(rows) {
		console.log("updateGamesList");
		$('#favorites ul').replaceWith(
			'<ul data-role="listview" data-theme="c" data-inset="true"></ul>'
		);
		
		if(rows.length==0) {
			$('#favorites ul').html("<li>No results</li>");
		}
		
		for(var i=0; i<rows.length; ++i) {
			var game = rows.item(i);
			
			var datetime = game.Jour.replace(/^\d{4}\-0?/, "");
			var home = game.Home;
			var away = game.Away;
			var byeTeam = null;
			
			if(game.Home == "-") {
				if(game.Away == "-") continue;
				home = "BYE";
				byeTeam = away;
			} else if(game.Away == "-") {
				away = "BYE";
				byeTeam = home;
			} else {
				datetime += " &nbsp;&nbsp;" + game.Heur.replace(/:00$/, "");
			}
			
			if(DataControl.isTeamSaved(home)) {
				home = "<span class='saved-team'>"+home+"</span>";
			}
			
			if(DataControl.isTeamSaved(away)) {
				away = "<span class='saved-team'>"+away+"</span>";
			}
			
			var teams;
			if(byeTeam == null) {
				teams = home + " - " + away;
			} else {
				teams = "<span class='saved-team'>"+byeTeam+"</span>";
			}
			
			$('#favorites ul').append("<li><a href='#game?" + game.ID + "'>" +
				"<h3 class='width40'>"+datetime+"</h3>" +
				"<h3 class='width60'>"+teams+"</h3>" +
				"<p>"+((byeTeam==null)?"Region "+game.Field:"Bye week")+"</p>" +
			"</a></li>");
		}
		
		$('#favorites ul').listview();
	}
};