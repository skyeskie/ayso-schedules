var app = {
	currentView: null,
	
    initialize: function() {
    	console.log("Initializing App");
        this.store = new WebSqlStore();
        
        console.log("Calling 'countWeeks'");
        app.store.countWeeks(
			function(num) {
				console.log("Setting "+num);
				WeekView._maxWeeks = num;
				
				//Refresh if we're in WeekView
				if(app.currentView==WeekView.type) app.route();
			}
		);
        
        console.log("Registering events");
        this.registerEvents();
        console.log("Displaying appropriate page");
        this.route();
    },
    
	registerEvents: function() {
		$(window).on('hashchange', $.proxy(this.route, this));
	},
    
	indexURL:  /^#([\w\-_]+)$/,
	detailsURL: /^#([\w\-_]+)\/([\w\-_%]*)$/,
	
    route: function() {
        var hash = window.location.hash;
        if (!hash || hash == "index" || hash == "") {
            HomeView.printView();
            return;
        }
        
        
        var isIndex = null;
        var filterType = null;
        var offset = null;
        //Check for index matching
        var match = hash.match(app.indexURL);
        if (match) {
            isIndex = true;
            filterType = match[1];
        } else {
        	
	    	match = hash.match(app.detailsURL);
	    	if(match) {
	    		isIndex = false;
	    		filterType = match[1];
	    		offset = match[2];
	    	} else {
	    		console.log("Error: unexpected hash pattern.");
	    		HomeView.printView();
	    		return;
	    	}
	    	
        }
    	
    	switch(filterType) {
	        case WeekView.type:
	        	if(isIndex) WeekView.showIndex();
	        		else WeekView.showDetail(offset);
	        	break;
	        	
	        case FieldView.type:
	        	if(isIndex) FieldView.showIndex();
	        		else FieldView.showDetail(offset);
	        	break;
	        	
	        case TeamView.type:
	        	if(isIndex) TeamView.showIndex();
	        		else TeamView.showDetail(offset);
	        	break;
	        
	        default:
	        	console.log("Error: unexpected page type.");
	        	HomeView.printView();
	        	break;
        }
        return;
    },
	
	PrintTableList : function(headers, rowset, fields) {
		//Headers -- array of strings of header names.
		//Rowset -- SQLResultSetList of rows to print
		//Fields -- array for order of columns
		
		var os = "<table>\n<tr class='thead'>";
		for(var header in headers) {
			os += "\t<th>";
			os += headers[header];
			os += "</th>\n";
		}
		os += "</tr>";
		
		//Empty set
		if(rowset.length == 0) {
			os += "<tr><td colspan='"+headers.length+"' class='emptyset'>";
			os += "No games found</td></tr>\n";
			
			$('#main').append(os);
			return;
		}
		
		for(var i = 0; i < rowset.length; ++i) {
			os += "\t<tr>\n";
			var row = rowset.item(i);
			
			/*//Basic -- native ordering
			for(var p in row) {
				os += "\t\t<td>";
				os += row[p];
				os += "</td>\n";
			}*/
			
			
			for(var field in fields) {
				os += "\t\t<td>";
				os += row[fields[field]];
				os += "</td>\n";
			}

			os += "\t</tr>\n";
		}
		
		os += "</table>";
		
		$('#main').append(os);
	}
};

app.initialize();