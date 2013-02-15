var GameView = {
	type: "game",
	
	showIndex: function() {
		console.error("Game view needs a game ID");
		HomeView.printView();
	},
	
	showDetail: function(gameID) {
		app.db.getGameDetail(gameID,
		function(rows) {
			if(rows.length==0) {
				console.error("Invalid game: "+gameID);
				HomeView.printView();
				return;
			}
			
			var game = rows.item(0);
			
			$("#game-home").html(game.Home);
			$("#game-away").html(game.Away);
			$("#game-date").html(game.Jour);
			$("#game-time").html(game.Heur);
			
			var match = game.Field.match(/0?(\d{1,4})\s*(Field\s*)?(.+)/);
			$("#game-region").html(match[1]);
			$("#game-field").html(match[3]);
			
			//Coach info
			app.activateCallButton("#home-coach .tel", game.HomeCoachPhone);
			$('#home-coach .name').html(app.nameSwitch(game.HomeCoach));
			app.activateCallButton("#away-coach .tel", game.AwayCoachPhone);
			$('#away-coach .name').html(app.nameSwitch(game.AwayCoach));
			
			
			var $page = $( "#game" );
			$page.page();
			$.mobile.changePage( $page );
			window.hash = "team?" + gameID;
			app.currentView = this.type;
		});
	}
};