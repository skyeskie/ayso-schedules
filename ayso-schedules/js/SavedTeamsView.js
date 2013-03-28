var SavedTeamsView = {
	type: "favorites",
	buttonSelector: null,
	
	favoriteToggle: function(triggerObject) {
		var pre = "#team-detail";
		var team = $(pre).data("team");
		if(DataControl.isTeamSaved(team)) {
			DataControl.unSaveTeam(team);
			console.log("Saving team");
		} else {
			DataControl.saveTeam(team);
			console.log("Unsaving team");
		}
		SavedTeamsView.favoriteInit(pre, team);
	},
	
	favoriteInit: function(pre, team) {
		$(pre).data("team", team);
		if(DataControl.isTeamSaved(team)) {
			$(pre+" .ui-icon-star").addClass('ui-icon-alt');
			$(pre+" .fav").html("Unsave");
		} else {
			$(pre+" .ui-icon-star").removeClass('ui-icon-alt');
			$(pre+" .fav").html("Save");
		}
	},
	
	showIndex: function() {
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
		
		//Populate games listing
		$('#favorites ul').append("<li>Loading...</li>");
		app.db.findByFavorites(this.updateGamesList);
	},
	
	updateGamesList: function(rows) {
		console.log("updateGamesList");
		$('#favorites ul').replaceWith(
			'<ul data-role="listview" data-theme="c" data-inset="true"></ul>'
		);
		
		if(rows.length==0) {
			$('#favorites ul').html("<div>" +
				"<h2 style='text-align: center;'>No saved teams</h2><br />" +
				"<ol>" +
					"<li>Go to 'Settings &gt; '<a href='#team'>Find Team</a>'</li>" +
					"<li>Click the 'Save' button in the top right</li>" +
				"</ol><br /><div class='main-buttons'>" +
				"<a href='#team' data-role='button'>Find Team</a></div><br /></div>"
			).trigger('create');
		}
		
		for(var i=0; i<rows.length; ++i) {
			var game = rows.item(i);
			
			var datetime = "";
			var home = game.Home;
			var away = game.Away;
			var byeTeam = null;
			
			if(game.Home == "-") {
				if(game.Away == "-") continue;
				home = "BYE";
				byeTeam = away;
				datetime = app.formatDate(game.Jour);
			} else if(game.Away == "-") {
				away = "BYE";
				byeTeam = home;
				datetime = app.formatDate(game.Jour);
			} else {
				datetime = app.formatDateTime(game.Jour, game.Heur);
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
			
			$('#favorites ul').append("<li>" +
				((byeTeam==null)?"<a href='#game?" + game.ID + "'>":"") +
				"<h3 class='width60'>"+datetime+"</h3>" +
				"<h3 class='width40'>"+teams+"</h3>" +
				"<p>"+((byeTeam==null)?"Region "+game.Field:"Bye week")+"</p>" +
				((byeTeam==null)?"</a>":"") +
			"</li>");
		}
		
		$('#favorites ul').listview();
	}
};

app.routeAdd(
	[
		{"#favorites" : { handler: "hFavorites", events: "bs" }}
	],
	{
		hFavorites: function(eventType, matchObj, ui, page, evt) {
			SavedTeamsView.showIndex();
		}
	}
);
