var app = {
	currentView: null,
	
    initialize: function() {
    	console.log("Initializing App");
        this.store = new WebSqlStore();
        TeamView.init();
        
        console.log("Calling 'countWeeks'");
        app.store.countWeeks(
			function(num) {
				console.log("Setting "+num);
				WeekView._maxWeeks = num;
				
				//Refresh if we're in WeekView
				//if(app.currentView==WeekView.type) app.route();
			}
		);//*/
        
        console.log("Registering events");
        
        //jQueryMobile hooking
        $(document).bind( "pagebeforechange", function( e, data ) {
        	console.log("Running pagebeforechange");
        	if(typeof data.toPage === "string" ) {
        		var u = $.mobile.path.parseUrl( data.toPage );

        		if ( u.hash.search(app.processableURL) !== -1 ) {
        			data.options.dataUrl = u.href;
        			
        			app.route(u, data.options);

        			// Kill jQueryMobile's auto-processing
        			e.preventDefault();
        		} else console.log("URL["+u.href+"] is not processable");
        	} else if(data.toPage[0].id == "main") {
        		//First run -- we want to call route
        		app.route({hash: window.hash});
        		e.preventDefault();
        	}
        });
        
        //Setup page headers
        $('.page').prepend($("#site-header").html());
    },
    
	indexURL:  /^#([\w\-_]+)$/,
	detailsURL: /^#([\w\-_]+)[\/\?]([\w\-_%]*)$/,
	
	//Combination of above two for jQuery hook
	processableURL: /^#[\w\-_]+([\/\?][\w\-_%]*)?$/,
	
    route: function(urlObject, options) {
    	console.log("Running route function");
        var hash = urlObject.hash;
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
	        /*	
	        case FieldView.type:
	        	if(isIndex) FieldView.showIndex();
	        		else FieldView.showDetail(offset);
	        	break;
	        //*/	
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
    }
};

app.initialize();