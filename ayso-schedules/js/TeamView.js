var TeamView = {
	type: "team",
	
	//regions: Array("49", "105", "208", "253", "491"),
	//divisions: Array("U6", "U8", "U10", "U12", "U14", "U19"),
	
	showIndex: function() {
		$('#team .results ul.ui-block-b').append("Loading...");
		
		$('#team .ui-btn-active').removeClass('ui-btn-active');
		
		$('#team .divis-select1').data('active', null);
		$('#team .gender-select').data('active', null);
		$('#team .region-select').data('active', null);
		TeamView.generateListing();
	},
	
	regionUpdate: function(triggerObject) {
		//Remove jQuery Mobile's handler
		$('#team .region-select').undelegate('a', 'vclick');
		
		var sel = $(triggerObject.target).text();
		var $target = $('#team .region-select .'+sel+' a');
		
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
		//Remove jQuery Mobile's handler
		$('#team .divis-select1').undelegate('a', 'vclick');
		$('#team .divis-select2').undelegate('a', 'vclick');
		
		var sel = $(triggerObject.target).text();
		var $target = $('#team .'+sel+' a');
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
		//Remove jQuery Mobile's handler
		$('#team .gender-select').undelegate('a', 'vclick');
		
		var sel = $(triggerObject.target).text();
		var $target = $('#team .gender-select .'+sel+' a');
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
		$("#team .results ul").empty();
		if(rows.length==0) {
			$("#team .results .ui-block-b").append("<li>No teams found.</li>");
		}
		
		var cols = ["#team .results .ui-block-a",
		            "#team .results .ui-block-b",
		            "#team .results .ui-block-c"];
		var col = 0;
		var wrap = Math.ceil(rows.length/3);
		
		for(var i=0; i<rows.length; ++i) {
			var val = rows.item(i).Home;
			if(i==wrap) {
				wrap*=2;
				col++;
			}
			
			$(cols[col]).append(
				"<li><a href='index.html#team-detail?"+val+"'>"+val+"</a></li>"
			);
		}
		$("#team").page();
		$("#team .results ul").listview();
		$("#team .results ul").listview('refresh');
	},
	
	teamRegEx: /^(\d)(\d)(\d{1,2})([GBC])$/i,
	
	showDetail: function(team) {
		$('#team-detail .listing').empty();
		$('#team-detail span.team').html(team);
		$('#team-detail ul').html("<li><em>Loading...</em></li>");
		$('button.tel').hide();
		$('#team-detail span.coach').hide();
		SavedTeamsView.favoriteInit('#team-detail', team);
		//SavedTeamsView.favoriteInit('#team-detail button.myteam', team);
		//$('button.myteam').show();
		
		app.db.findByTeam(team, function(rows) {
			$('#team-detail ul').replaceWith(
				'<ul data-role="listview" data-theme="c" data-inset="true"></ul>'
			);
			
			if(rows.length==0) {
				$('#team-detail ul').html("<li>No results</li>");
			}
			
			for(var i=0; i<rows.length; ++i) {
				var game = rows.item(i);
				var hasBye = false;
				var datetime = game.Jour.replace(/^\d{4}\-0?/, "");
				var opponent, field;
				if(game.Opponent=="-") {
					opponent = "Bye";
					field = "&nbsp;";
					hasBye = true;
				} else {
					datetime += " &nbsp;&nbsp;" + game.Heur.replace(/:00$/, "");
					opponent = game.HA+" "+game.Opponent;
					field = "Region " + game.Field;
				}
				
				$('#team-detail ul').append("<li>" +
					((hasBye)?"":"<a href='#game?" + game.ID + "'>") +
					"<h3 class='width50'>"+datetime+"</h3>" +
					"<h3 class='width50'>"+opponent+"</h3>" +
					"<p>"+field+"</p>" +
					((hasBye)?"":"</a>") +
				"</li>");
			}
			
			$('#team-detail ul').listview();
		});
		
		app.db.getCoachInfo(team, function(rows) {
			if(rows.length==0) return;
			var coach = rows.item(0);
			
			app.activateCallButton("#team-detail .tel", coach.Phone);
			var coachName = app.nameSwitch(coach.Coach);
			
			$('#team-detail span.coach').show();
			$('#team-detail span.coach').html("Coach "+coachName);
		});
	}
};

app.routeAdd(
	[
		{"#team$" : { handler: "hTeamSelect", events: "bs" }},
		{"#team\\-detail\\?(.*)" : { handler: "hTeamDetail", events: "bs" }}
	],
	{
		hTeamSelect: function(eventType, matchObj, ui, page, evt) {
			TeamView.showIndex();
		},
		
		hTeamDetail: function(eventType, matchObj, ui, page, evt) {
			console.log("Team detail");
			TeamView.showDetail(matchObj[1]);
		}
	}
);