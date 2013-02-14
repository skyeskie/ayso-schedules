var DataControl = {
	remoteURL: "http://192.168.1.89/ayso-schedules/php/json.php",
	
	lastData: null,
	
	savedTeams: null,
	
	isAppSetup: function() {
		var init = window.localStorage.getItem("init");
		
		return (init && init=="T");
	},
	
	setupError: function(msg) {
		var message = "";
		switch(typeof msg) {
		case "string": message = msg; break;
		case "SQLError": message = msg.message; break;
		case "object":
			if(typeof msg.message != "undefined")
				message = msg.message;
			else message = "No further details known.";
			break;
			
		default: 
			message = "Error sent object type: " + (typeof msg);
			break;
		}
		
		//Create error message and display
		console.error(message);
		$("#error #message").html(message);
		
		var $page = $( "#error" );
		$page.page();
		$.mobile.changePage( $page );
	},
	
	updateData: function() {
		console.log("Running data update");
		//TODO Figure out how displaying UI status
		
		$.post(this.remoteURL, { lastUpdate: DataControl.getLastUpdate() },
				DataControl.updateFinish, "json")
			.fail(function(error) {
				console.error("Error connecting to remote server: "+error);
			});
	},
	
	updateFinish: function(data) {
		console.log("Processing data");
		
		if(typeof data.Error == "undefined") {
			console.log("Improper JSON response.");
			return;
		}
		
		if(data.Error!="") {
			console.log(data.Error);
			return;
		}
		
		DataControl.lastData = data;
		
		//Inject into DB
		app.db.db.transaction(DataControl.injectData,
			function(msg) {
				console.error("Transaction error on update: " + msg.message);
			}
		);
	},
	
	downloadInitialData: function() {
		//Call AJAX
		console.log("Running initial data setup");
		$("#setup-status p").html("Downloading latest data...");
		$.post(this.remoteURL, {}, DataControl.processInitialData, "json")
			.fail(function(error) {
				DataControl.setupError("Error connecting remote server: "+error);
			});		
	},
	
	processInitialData: function(data) {
		console.log("Processing data");
		$("#setup-status p").html("Processing data...");
		
		if(typeof data.Error == "undefinded") {
			DataControl.setupError("Improper JSON response.");
			return;
		}
		
		if(data.Error!="") {
			DataControl.setupError(data.error);
			return;
		}
		
		DataControl.lastData = data;
		
		//Inject into DB
		app.db.db.transaction(DataControl.sqlInit,
				DataControl.setupError, DataControl.setupCache);
	},
	
	sqlInit: function(tx) {
		//Since initial data, we need to make sure empty so no duplicates
		tx.executeSql('DELETE FROM games WHERE 1');
		tx.executeSql('DELETE FROM coaches WHERE 1');
		DataControl.injectData(tx);
	},
	
	setupCache: function() {
		console.log("Setting cache");
		$("#setup-status p").html("Setting cache...");
		
		//Cache max number of weeks
		app.db.db.transaction(DataControl.sqlCacheGenerate,
			DataControl.setupError, DataControl.setupFinish 
    	);
	},
	
	sqlCacheGenerate: function(tx) {
		var sql = "SELECT MAX(Week) AS nweeks FROM games LIMIT 1";
		tx.executeSql(sql, [], DataControl.sqlCacheResult);
	},
	
	sqlCacheResult: function(tx, results) {
		if(results.rows.length==0) {
			console.error("Error: could not determine max weeks.");
			window.localStorage.setItem("maxWeeks", 9); //Default
		}
		
		console.log("Setting maxWeeks");
		window.localStorage.setItem("maxWeeks", results.rows.item(0).nweeks);
	},
	
	setupFinish: function(data) {
		console.log('Setup success');
		$("#setup-status p").html("Setup complete.");
		window.localStorage.setItem("lastUpdate", DataControl.lastData.Version);
	},
	
	
	
	injectData: function(tx) {
		var data = DataControl.lastData;
		console.log("Calling data update");
		
		console.log("Updating games...");
		for(var i=0; i < data.Games.length; ++i) {
			var game = data.Games[i];
			
			tx.executeSql("INSERT OR REPLACE INTO games " +
				"(ID, Field, Week, Jour, Heur, Divis, Away, Home) " +
				"VALUES ("+game.ID+",'"+game.Field+"'," +
					"'"+game.Week+"','"+game.Jour+"','"+game.Heur+"'," +
					"'"+game.Divis+"','"+game.Away+"','"+game.Home+"')"
			);
		}
		
		console.log("Updating coaches...");
		for(var i=0; i < data.Coaches.length; ++i) {
			var coach = data.Coaches[i];
			
			tx.executeSql("INSERT OR REPLACE INTO coaches " +
				"(ID, Divis, TeamNo, Coach, Phone) " +
				"VALUES ("+coach.ID+", '"+coach.Divis+"', " +
					"'"+coach.TeamNo+"', '"+coach.Coach+"', '"+coach.Phone+"')"
			);
		}
	},
	
	setupButtonControl: function() {
		if($("#setup-status p").text() == "Setup complete." &&
			$("input[name='radio-region']:radio").val()!=null) {
			
			console.log("ENABLE!!!");
			$("#setup-finish").prop("disabled", false);
			$("#setup-finish").button('enable');
			
			$("#setup :radio").unbind('click');
		} else {
			$("#setup-finish").prop("disabled", true);
			$("#setup-finish").button('disable');
		}
	},
	
	setupButtonClick: function() {
		if($("#setup-finish").prop("disabled")) return;
		
		window.localStorage.setItem("init","T");
		window.localStorage.setItem("region",
			$("input[name='radio-region']").val());
		
		HomeView.printView();
	},
	
	
	//Get functions
	
	getMaxWeeks: function() {
		return window.localStorage.getItem("maxWeeks");
	},
	
	getRegion: function() {
		return window.localStorage.getItem("region");
	},
	
	getLastUpdate: function() {
		return window.localStorage.getItem("lastUpdate");
	},
	
	//MyTeams functions
	populateSavedTeams: function() {
		if(window.localStorage.getItem("savedTeams")==null) {
			window.localStorage.setItem("savedTeams", "");
		}
				
		this.savedTeams = window.localStorage.getItem("savedTeams").split(",");
		
	},
	
	storeSavedTeams: function() {
		if(this.savedTeams==null) return;
		window.localStorage.setItem("savedTeams", this.savedTeams.join());
	},
	
	saveTeam: function(team) {
		if(this.isTeamSaved(team)) return;
		this.savedTeams.push(team);
		this.storeSavedTeams();
	},
	
	unSaveTeam: function(team) {
		if(!this.isTeamSaved(team)) return;
		this.savedTeams.splice(this.savedTeams.indexOf(team), 1);
		this.storeSavedTeams();
	},
	
	isTeamSaved: function(team) {
		if(this.savedTeams==null) this.populateSavedTeams();
		return (-1 != this.savedTeams.indexOf(team));
	},
	
	//Conversion functions
	regionToID: function(region) {
		switch(region) {
	    	case '49':  return '1'; break;
	    	case '105': return '2'; break;
	    	case '208': return '4'; break;
	    	case '253': return '5'; break;
	    	case '491': return '6'; break;
	    	default: return null; break;
		}
	},
	
	regionFromID: function(regionID) {
		switch(regionID) {
			case '1':  return '49'; break;
	    	case '2': return '105'; break;
	    	case '4': return '208'; break;
	    	case '5': return '253'; break;
	    	case '6': return '491'; break;
	    	default: return null; break;
		}
	},
	
	divisionToCode: function(division) {
		switch(division) {
			case  "U5": return '8'; break;
			case  "U6": return '7'; break;
			case  "U8": return '6'; break;
			case "U10": return '5'; break;
			case "U12": return '4'; break;
			case "U14": return '3'; break;
			case "U16": return '2'; break;
			case "U19": return '1'; break;
			default: return null;
		}
	}
};