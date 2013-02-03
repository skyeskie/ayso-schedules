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
                    self.addSampleData(tx);
                },
				
				function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
				
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        );
    };

    this.createTable = function(tx) {
    	console.log("createTable");
		//Remove existing table
        tx.executeSql('DROP TABLE IF EXISTS games');
        tx.executeSql("CREATE TABLE IF NOT EXISTS `games` ("
  			+ " `ID` int(11) NOT NULL DEFAULT '0',"
  			+ " `Field` text NOT NULL,"
  			+ " `Week` int(11) NOT NULL DEFAULT '0',"
  			+ " `Jour` date NOT NULL DEFAULT '0000-00-00',"
  			+ " `Heur` time NOT NULL DEFAULT '00:00:00',"
  			+ " `Divis` text NOT NULL,"
  			+ " `Away` text NOT NULL,"
  			+ " `Home` text NOT NULL,"
  			+ " `RefLead` text NOT NULL,"
  			+ " `RefAsst1` text NOT NULL,"
  			+ " `RefAsst2` text NOT NULL"
  			+ " ) ");
    };

    this.addSampleData = function(tx) {
    	console.log("Adding sample data");
        insertGamesData(tx);
        console.log('Data added');
    };
    
    this.countWeeks = function(callback) {
    	console.log("countWeeks");
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
                var sql = "SELECT * FROM games " +
                		" WHERE Week = "+Number(weekNum)+
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
    	switch(region) {
	    	case  null: reg = '_'; break;
	    	case '49': reg = '1'; break;
	    	case '105': reg = '2'; break;
	    	case '208': reg = '4'; break;
	    	case '253': reg = '5'; break;
	    	case '491': reg = '6'; break;
    	}
    	
    	var div = '_';
    	switch(divis) {
	    	case  null: div = '_'; break;
	    	case  "U5": div = '8'; break;
	    	case  "U6": div = '7'; break;
	    	case  "U8": div = '6'; break;
	    	case "U10": div = '5'; break;
	    	case "U12": div = '4'; break;
	    	case "U14": div = '3'; break;
	    	case "U16": div = '2'; break;
	    	case "U19": div = '1'; break;
    	}
    	
    	this.db.transaction(
    		function(tx) {
    			var sql = "SELECT DISTINCT away AS Home FROM games" +
    					" WHERE away LIKE '"+reg+div+'%'+g+"' " +
    					" AND away <> '-' " +
    					" ORDER BY away ASC";
    			
    			console.log("Updating teams with: "+sql);
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
    			var sql = "SELECT Jour, Heur, Field, 'vs' AS HA, away AS Opponent " +
    					" FROM games WHERE Home = '"+team+"' " +
    					" UNION " +
    					" SELECT Jour, Heur, Field, 'at' AS HA, home AS Opponent " +
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
    
    this.getFieldList = function(callback) {
    	this.db.transaction(
	        function(tx) {
	            var sql = "SELECT DISTINCT field FROM games WHERE field <> 'Bye'";
	            
	            tx.executeSql(sql, [], function(tx, results) {
	            	callback(results.rows);
	            });
	        },
            this.transactionError
       );
    };

    this.findByField = function(fieldNum, callback) {
        this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM games WHERE field = '"+ decodeURI(fieldNum) + "'" +
                		" ORDER BY Jour ASC, Heur ASC";

                tx.executeSql(sql, [], function(tx, results) {
                    callback(results.rows);
                });
            },
            this.transactionError
        );
    };
    
    this.initializeDatabase(successCallback, errorCallback);
};
