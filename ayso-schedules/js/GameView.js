var GameView = {
	type: "game",
	
	showDetail: function(gameID) {
		app.db.getGameDetail(gameID,
		function(rows) {
			if(rows.length==0) {
				console.error("Invalid game: "+gameID);
				HomeView.printView();
				return;
			}
			
			var game = rows.item(0);
			
			$("#game .home .team-code").html(game.Home);
			$("#game .away .team-code").html(game.Away);
			$(".game-datetime").html(app.formatDateTime(game.Jour,game.Heur));
			$(".game-week").html(game.Week);
			
			var match = game.Field.match(/0?(\d{1,4})\s*(Field\s*)?(.+)/);
			$(".game-region").html(match[1]);
			$(".game-field").html(match[3]);
			
			//Coach info
			app.activateCallButton(".home .coach .tel", game.HomeCoachPhone);
			$('.home .coach .name').html(app.nameSwitch(game.HomeCoach));
			app.activateCallButton(".away .coach .tel", game.AwayCoachPhone);
			$('.away .coach .name').html(app.nameSwitch(game.AwayCoach));
			
			$('#game .field-link').attr("href", "#fields?"+match[1]);
			$('#game .map-link').attr("href", "#map?"+match[1]);
		});
	}
};

app.routeAdd(
	[
		{"#game\\?(\\d+)" : { handler: "hGame", events: "bs" }}
	],
	{
		hGame: function(eventType, matchObj, ui, page, evt) {
			GameView.showDetail(matchObj[1]);
		}
	}
);