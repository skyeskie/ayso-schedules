var DivisionView = {
	type: "divis",
	
	showIndex: function() {
		$('#divis .results').html("Loading...");
		
		$('#divis .ui-btn-active').removeClass('ui-btn-active');
		
		$('#divis .divis-select1').data('active', null);
		$('#divis .gender-select').data('active', null);
		$('#divis .region-select').data('active', null);
		
		app.currentView = this.type;
		
		var $page = $( "#divis" );
		$page.page();
		$.mobile.changePage( $page );
		window.hash = "divis";
	},
	
	regionUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('ui-btn-active')) {
			$target.removeClass('ui-btn-active');
			$('#divis .region-select').data('active', null);
		} else {
			$('#divis .region-select .ui-btn-active').removeClass('ui-btn-active');
			$target.addClass('ui-btn-active');
			$('#divis .region-select').data('active', $target.text());
		}
	},
	
	divisionUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('ui-btn-active')) {
			$target.removeClass('ui-btn-active');
			$('#divis .divis-select1').data('active', null);
		} else {
			$('#divis .divis-select1 .ui-btn-active').removeClass('ui-btn-active');
			$('#divis .divis-select2 .ui-btn-active').removeClass('ui-btn-active');
			$target.addClass('ui-btn-active');
			$('#divis .divis-select1').data('active', $target.text());
		}
	},
	
	genderUpdate: function(triggerObject) {
		var $target = $(triggerObject.target);
		if($target.hasClass('ui-btn-active')) {
			$('#divis .gender-select').data('active', null);
			$('#divis .gender-select .ui-btn-active').removeClass('ui-btn-active');
		} else {
			$('#divis .gender-select .ui-btn-active').removeClass('ui-btn-active');
			$target.addClass('ui-btn-active');
			$('#divis .gender-select').data('active', $target.text());
		}
	},
	
	weekUpdate: function() {
		//TODO Put in display showing Date for week No.
		//Need to cache values in SETUP
	},
	
	doSubmit: function() {
		var params = "r="+ $('#divis .region-select').data('active');
		params += "&d=" + $('#divis .divis-select1').data('active');
		params += "&g=" + $('#divis .gender-select').data('active');
		params += "&w=" + $('#slider-week').val();
		
		console.log("Going to #divis?" + params);
		$.mobile.changePage("#divis?" + params);
	},
	
	showDetail: function(filter) {
		//Process
		var match = filter.match(/r=([^&]*)/);
		var region = match[1];
		match = filter.match(/d=([^&]*)/);
		var divis = match[1];
		match = filter.match(/g=([^&]*)/);
		var gender = match[1];
		match = filter.match(/w=([^&]*)/);
		var week = match[1];
		
		

		if(Number(week) > 1) {
			$("#games-list .week-bar a.back").show();
			$("#games-list .week-bar a.back").attr("href","#divis?"+
				filter.replace(/w=([^&]*)/, "w="+(Number(week)-1)));
		} else {
			$("#games-list .week-bar a.back").hide();
		}
		
		if(week < DataControl.getMaxWeeks()) {
			$("#games-list .week-bar a.next").show();
			$("#games-list .week-bar a.next").attr("href","#divis?"+
				filter.replace(/w=([^&]*)/, "w="+(Number(week)+1)));
		} else {
			$("#games-list .week-bar a.next").hide();
		}
		
		var regionID = DataControl.regionToID(region);
		var divisNum = DataControl.divisionToCode(divis);
		
		var desc = "";
		if(regionID != null) desc += "Region " + region + " ";
		else regionID = "_";
		
		if(divisNum != null) desc += divis + " ";
		else divisNum = "_";
		
		var gen = "_";
		if(gender != "null") {
			gen = gender[0];
			desc += gender;
		}
		
		var teamFilter = regionID + divisNum + "%" + gen;
		
		$('#games-list .listing').empty();
		$('#games-list .subheader h2').html(desc);
		$('#games-list ul').html("<li><em>Loading...</em></li>");
		$('#games-list .week-bar h2 span').html(week);
		
		app.db.findByDivWeek(teamFilter, week, function(rows) {
			$('#games-list ul').replaceWith(
				'<ul data-role="listview" data-theme="c" data-inset="true"></ul>'
			);
			
			if(rows.length==0) {
				$('#games-list ul').html("<li>No results</li>");
			}
			
			var byes = Array();
			var lastTime = null;
			for(var i=0; i<rows.length; ++i) {
				var game = rows.item(i);
				
				if(game.Home=="-" || game.Away=="-") {
					if(game.Home=="-" && game.Away=="-") continue;
					
					byes.push((game.Away=="-")?game.Home:game.Away);
					continue;
				}
				
				var matchup = game.Home + " vs " + game.Away;
				
				var time = game.Heur.replace(/:00$/,"");
				
				if(lastTime != time) {
					$('#games-list ul').append(
						'<li data-role="list-divider">'+time+'</li>'
					);
					lastTime = time;
				}
				
				$('#games-list ul').append("<li><a href='#game?" + game.ID + "'>" +
					"<h3 class='width40'>"+game.Field+"</h3>" +
					"<h3 class='width60 ta-right'>"+matchup+"</h3>" +
				"</a></li>");
			}
			
			var byelist = "";
			for(var i=0; i<byes.length; ++i) {
				if(i>0) byelist += ", ";
				byelist += byes[i];
			}
			
			//Prepend, so reverse order
			$('#week ul').prepend("<li>"+byelist+"</li>");
			$('#week ul').prepend('<li data-role="list-divider">Byes</li>');
			
			$('#games-list ul').listview();
		});
		
		var $page = $( "#games-list" );
		$page.page();
		$.mobile.changePage( $page );
		window.hash = "divis?" + filter;
	}
};