var WeekView = {
	type: "week",
	
	maxWeeks: function() { 
		return app.data.getMaxWeeks();
	},
	
	showIndex: function() {
		var cur = DataControl.getCurrentWeek();
		//Update routing stack to account for auto-route
		app.viewStack.pop();
		app.viewStack.push("#week?"+cur);
		this.showDetail(cur);
		console.log(app.viewStack);
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
		
		app.db.findByWeek(week, function(rows) {
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
				
				var time = app.formatDateTime(game.Jour, game.Heur);
				
				if(lastTime != time) {
					$('#week ul').append(
						'<li data-role="list-divider">'+time+'</li>'
					);
					lastTime = time;
				}
				
				$('#week ul').append("<li><a href='#game?" + game.ID + "'>" +
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
			
			$('#week ul').listview();
		});
		
		app.currentView = this.type;
	}
};

app.routeAdd(
	[
		{"#week$" : { handler: "hWeekDefault", events: "bs" }},
		{"#week\\?(\\d+)" : { handler: "hWeekView", events: "bs" }}
	],
	{
		hWeekDefault: function(eventType, matchObj, ui, page, evt) {
			WeekView.showDetail(DataControl.getCurrentWeek());
		},
		
		hWeekView: function(eventType, matchObj, ui, page, evt) {
			//Add replace state here?
			console.log("Page:");
			console.log(page);
			WeekView.showDetail(matchObj[1]);
		}
	}
);