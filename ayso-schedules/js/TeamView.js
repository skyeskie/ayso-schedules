var TeamView = {
	type: "team",
	
	regions: Array("49", "105", "208", "253", "491"),
	divisions: Array("U6", "U8", "U10", "U12", "U14", "U19"),
	
	showIndex: function() {
		$('#main').empty();
		$('#main').append("<h2>Select Team</h2>");
		
		$('#main').append("<div id='region-scroll'></div>");
		for(var reg in this.regions) {
			$('#region-scroll').append("<input type='button' value='"+this.regions[reg]+"' />");
		}
		
		$('#main').append("<div id='divis-scroll'></div>");
		for(var div in this.divisions) {
			$('#divis-scroll').append("<input type='button' value='"+this.divisions[div]+"' />");
		}
				
		$('#main').append("<div id='gender-select'></div>");
		$('#gender-select').append("<input type='button' value='Girls' />");
		$('#gender-select').append("<input type='button' value='Boys' />");		
		
		$('#main').append("<div id='listings'>Loading...</div>");
		
		this.addFormListeners();

		app.currentView = this.type;
	},
	
	regionUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('active')) {
			$target.removeClass('active');
			$('#region-scroll').data('active', null);
		} else {
			$('#region-scroll .active').removeClass('active');
			$target.addClass('active');
			$('#region-scroll').data('active', $target.val());
		}
		TeamView.generateListing();
	},
	
	divisionUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('active')) {
			$target.removeClass('active');
			$('#divis-scroll').data('active', null);
		} else {
			$('#divis-scroll .active').removeClass('active');
			$target.addClass('active');
			$('#divis-scroll').data('active', $target.val());
		}
		TeamView.generateListing();
	},
	
	genderUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('active')) {
			$('#gender-select').data('active', null);
			$('#gender-select .active').removeClass('active');
		} else {
			$('#gender-select .active').removeClass('active');
			$target.addClass('active');
			$('#gender-select').data('active', $target.val());
		}
		TeamView.generateListing();
	},
	
	addFormListeners: function() {
		$('#divis-scroll input').click(this.divisionUpdate);
		$('#gender-select input').click(this.genderUpdate);
		$('#region-scroll input').click(this.regionUpdate);
		$('#divis-scroll').data('active', null);
		$('#gender-select').data('active', null);
		$('#region-scroll').data('active', null);
		TeamView.generateListing();
	},
	
	generateListing: function() {
		app.store.findTeams(this.updateListing,
				$('#region-scroll').data('active'),
				$('#divis-scroll').data('active'),
				$('#gender-select').data('active'));
	},
	
	updateListing: function(rows) {
		$("#listings").empty();
		if(rows.length==0) {
			$("#listings").append("No teams found.");
		}
		
		for(var i=0; i<rows.length; ++i) {
			var val = rows.item(i).Home;
			$("#listings").append("<div><a href='#team/"+val+"'>"+val+"</a></div>");
		}
	},
	
	teamRegEx: /^(\d)(\d)(\d{1,2})([GBC])$/i,
	
	teamHeader: function(team) {
		var html = "<div id='team-header'>";
		
		var match = team.match(this.teamRegEx);
		
		if(!match) {
			html += "Schedule for "+team+"</div>";
			return html;
		}
		
		html += "Region ";
		switch(Number(match[1])) {
			case 1: html +=  "49"; break;
			case 2: html += "105"; break;
			case 4: html += "208"; break;
			case 5: html += "253"; break;
			case 6: html += "491"; break;
			default:html += "???"; break;
		}
		
		html += ". ";
		
		switch(Number(match[2])) {
			case 1: html += "U19"; break;
			case 2: html += "U16"; break;
			case 3: html += "U14"; break;
			case 4: html += "U12"; break;
			case 5: html += "U10"; break;
			case 6: html += "U08"; break;
			case 7: html += "U06"; break;
			case 8: html += "U05"; break;
			default: html += match[2]; break;
		}
		
		html += " ";
		
		switch(match[4]) {
		case "G": html += "Girls"; break;
		case "B": html += "Boys"; break;
		case "C": html += "Coed"; break;
		}
		
		html += ". Team " + team;
		return html;
	},
	
	showDetail: function(team) {
		$('#main').empty();
		$('#main').append(this.teamHeader(team));
		app.store.findByTeam(team, function(rows) {
			app.PrintTableList(Array("Date", "Time", "Field", "", "Opponent"),
					rows, Array("Jour", "Heur", "Field", "HA", "Opponent"));
		});
		
		app.currentView = this.type;
	}
};