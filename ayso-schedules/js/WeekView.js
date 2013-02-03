var WeekView = {
	type: "week",
	
	_maxWeeks: null,
	maxWeeks: function() { 
		return this._maxWeeks;
	},
	
	showIndex: function() {
		//TODO: have this default to current/upcoming week
		this.showDetail(1);
	},
	
	showDetail: function(week) {
		$('#week ul').html("<li>Loading...</li>");
		
		$('#week h2 span').html(week);
		
		if(week>1) {
			$("#week a.back").show();
			$("#week a.back").attr("href","#week?"+(Number(week)-1));
		} else {
			$("#week a.back").hide();
		}
		
		if(week < this.maxWeeks()) {
			$("#week a.next").show();
			$("#week a.next").attr("href","#week?"+(Number(week)+1));
		} else {
			$("#week a.next").hide();
		}
		
		app.store.findByWeek(week, function(rows) {
			$('#week ul').replaceWith(
				'<ul data-role="listview" data-theme="c"></ul>'
			);
			
			if(rows.length==0) {
				$('#week ul').html("<li>No results</li>");
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
					$('#week ul').append(
						'<li data-role="list-divider">'+time+'</li>'
					);
					lastTime = time;
				}
				
				$('#week ul').append("<li>" +
					"<h3 class='width40'>"+game.Field+"</p>" +
					"<h3 class='width60 ta-right'>"+matchup+"</p>" +
				"</li>");
			}
			
			var byelist = "";
			for(var i=0; i<byes.length; ++i) {
				if(i>0) byelist += ", ";
				byelist += byes[i];
			}
			
			$('#week ul').prepend("<li>"+byelist+"</li>");
			$('#week ul').prepend('<li data-role="list-divider">Byes</li>');
			
			$('#week ul').listview();
		});
		
		app.currentView = this.type;

		var $page = $( "#week" );
		$page.page();
		$.mobile.changePage( $page );
		window.hash = "week?" + week;
	}
};