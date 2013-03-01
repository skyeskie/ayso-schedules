var WebSqlStore = function(successCallback, errorCallback) {
	this.transactionError = function(error) {
		alert("Transaction Error: " + error.message);
	};

    this.initializeDatabase = function(successCallback, errorCallback) {
    	console.log("Initializing database");
        var self = this;
        this.db = window.openDatabase("AysoSchedules", "1.0", "Ayso Match Schedules", 200000);
		
        this.db.transaction(
				//Create database
                function(tx) {
                    self.createTable(tx);
                    //self.addSampleData(tx);
                },
				
                this.transactionError,
				
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        );
    };

    this.createTable = function(tx) {
    	console.log("createTable");
		//Remove existing table
        tx.executeSql("CREATE TABLE IF NOT EXISTS `games` ("
  			+ " `ID` int(11) PRIMARY KEY,"
  			+ " `Field` text NOT NULL,"
  			+ " `Week` int(11) NOT NULL DEFAULT '0',"
  			+ " `Jour` date NOT NULL DEFAULT '0000-00-00',"
  			+ " `Heur` time NOT NULL DEFAULT '00:00:00',"
  			+ " `Divis` text NOT NULL,"
  			+ " `Away` text NOT NULL,"
  			+ " `Home` text NOT NULL"
  			//+ " `RefLead` text NOT NULL,"
  			//+ " `RefAsst1` text NOT NULL,"
  			//+ " `RefAsst2` text NOT NULL"
  			+ " ) ");
        
        tx.executeSql("CREATE TABLE IF NOT EXISTS `coaches` ("
  			+ "  `ID` int(11) PRIMARY KEY,"
  			+ "  `Divis` text NOT NULL,"
  			+ "  `TeamNo` text NOT NULL,"
  			+ "  `Coach` text NOT NULL,"
  			+ "  `Phone` text NOT NULL"
  			+ " ) "
  		);
    };
    
    this.removeAll = function() {
    	this.db.transaction(function(tx) {
    		tx.executeSql("DROP TABLE IF EXISTS games;");
    		tx.executeSql("DROP TABLE IF EXISTS coaches;");
    	},
    	this.transactionError);
    };

    this.addSampleData = function(tx) {
    	console.log("Adding sample data");
        insertGamesData(tx);
        console.log('Data added');
    };
    
    this.countWeeks = function(callback) {
    	this.db.transaction(
    		function(tx) {
    			var sql = "SELECT MAX(Week) AS nweeks FROM games LIMIT 1";
    			tx.executeSql(sql, [],
    				function(tx, results) {
    					if(results.rows.length==0) {
    						console.log("Error: could not determine max weeks.");
    						callback(9); //Default
    					}
    					callback(results.rows.item(0).nweeks);
    				}
    			);
    		},
    		this.transactionError
    	);
    };

    this.findByWeek = function(weekNum, callback) {
    	console.log("findByWeek");
        this.db.transaction(
            function(tx) {
            	var r = DataControl.regionToID(DataControl.getRegion());
            	if(r==null) r = "";
            	
                var sql = "SELECT * FROM games " +
            		" WHERE Week = "+Number(weekNum) +
            		" AND ( Home LIKE '"+r+"%' OR Away LIKE '"+r+"%')" +
            		" ORDER BY Heur ASC";

                tx.executeSql(sql, [],
                	function(tx, results) {
                    	callback(results.rows);
                	}
                );
            },
            this.transactionError
        );
    };
    
    this.findTeams = function(callback, region, divis, gender) {
    	console.log("Find teams with R-D-G: "+region+"-"+divis+"-"+gender);
    	var g = '_';
    	if(gender=='Girls') g = 'G';
    	if(gender=='Boys')  g = 'B';
    	if(gender=='Coed')  g = 'C';
    	
    	var reg = '_';
    	if(region!=null) reg = DataControl.regionToID(region);
    	
    	var div = '_';
    	if(divis!=null) div = DataControl.divisionToCode(divis);
    	
    	this.db.transaction(
    		function(tx) {
    			var sql = "SELECT DISTINCT away AS Home FROM games" +
    					" WHERE away LIKE '"+reg+div+'%'+g+"' " +
    					" AND away <> '-' " +
    					" ORDER BY away ASC";
    			
    			tx.executeSql(sql, [],
    				function(tx, results) {
    					callback(results.rows);
    				}
    			);
    		},
    		this.transactionError
    	);
    };
    
    this.findByTeam = function(team, callback) {
    	this.db.transaction(
    		function(tx) {
    			var sql = "SELECT ID, Jour, Heur, Field, 'vs' AS HA, away AS Opponent " +
    					" FROM games WHERE Home = '"+team+"' " +
    					" UNION " +
    					" SELECT ID, Jour, Heur, Field, 'at' AS HA, home AS Opponent " +
    					" FROM games WHERE Away = '"+team+"' ORDER BY Jour, Heur ASC";
    			
    			console.log(sql);
    			tx.executeSql(sql, [],
    				function(tx, results) {
    					callback(results.rows);
    				}
    			);
    		},
    		this.transactionError
    	);
    };
    
    this.findByDivWeek = function(team, week, callback) {
    	this.db.transaction(
    		function(tx) {
    			var sql = "SELECT ID, Jour, Heur, Field, Home, Away " +
    					" FROM games " +
    					" WHERE Week = " + week + " AND" +
    					" (Home LIKE '"+team+"' OR Away LIKE '"+team+"')" +
    					" ORDER BY Jour, Heur ASC";
    			
    			tx.executeSql(sql, [],
    				function(tx, results) {
    					callback(results.rows);
    				}
    			);
    		},
    		this.transactionError
    	);
    };
    
    this.findByFavorites = function(callback) {
    	this.db.transaction(
			function(tx) {
				var in_list = DataControl.savedTeams.join("','");
				if(in_list.length>0) {
					in_list = "'" + in_list + "'";
				} else {
					in_list = "'NoTeamMatchesThis'";
				}
				
				var sql = "SELECT ID, Jour, Heur, Field, Home, Away " +
						" FROM games " +
						" WHERE Home IN ("+in_list+") " +
							"OR Away IN ("+in_list+") " +
						" ORDER BY Jour, Heur ASC";
				
				console.log(sql);
				tx.executeSql(sql, [],
					function(tx, results) {
						callback(results.rows);
					}
				);
			},
			this.transactionError
		);
    };
    
    this.getCoachInfo = function(team, callback) {
    	this.db.transaction(
    		function(tx) {
    			var sql = "SELECT ID, Coach, Phone " +
    					" FROM coaches " +
    					" WHERE TeamNo = '" +team + "';";
    			
    			tx.executeSql(sql, [],
    				function(tx, results) {
    					callback(results.rows);
    				}
    			);
    		},
    		this.transactionError
    	);
    };
    
    this.getGameDetail = function(gameID, callback) {
    	this.db.transaction(function(tx) {
    		var sql = "SELECT games.*, ch.Coach AS HomeCoach, ch.Phone AS HomeCoachPhone," +
    				" ca.Coach AS AwayCoach, ca.Phone AS AwayCoachPhone " +
    				"FROM games LEFT JOIN coaches AS ch ON Home = ch.TeamNo" +
    				"	LEFT JOIN coaches AS ca ON Away = ca.TeamNo " +
    				"WHERE games.ID = '"+gameID+"'";
    		
    		console.log(sql);
    		
    		tx.executeSql(sql, [], function(tx, results) {
    			callback(results.rows);
    		});
    	},
    	this.transactionError);
    };
    
    this.initializeDatabase(successCallback, errorCallback);
};
