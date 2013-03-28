var app = {
	/**
	 * Region information for the app.
	 */
	regions : [ "49", "105", "208", "253", "491" ],
	divisions : [ "U5", "U6", "U8", "U10", "U12", "U14", "U19" ],
	regionsLong : [ "Stryker", "Southview", "West Wichita", "Valley Center",
			"Clearwater" ],

	/**
	 * Forces a full redownload of data.
	 * See init() for where it is used
	 */
	reset : function() {
		console.log("RESET called. Forcing full data download.");
		window.localStorage.removeItem("init");
	},
	
	/**
	 * Variables used in routing
	 * <initPage> and <firstRoute> used for entry into app
	 *     Also determine whether to go to setup view
	 * <viewStack> is used for routing Up
	 */
	initPage : null,
	firstRoute : true,
	viewStack : null,

	/**
	 * Shows a call button and sets its link to the phone number
	 * @param selector - CSS Selector for the call button
	 * @param number - String telephone number
	 *        Will be processed to remove parentheses and dashes
	 */
	activateCallButton : function(selector, number) {
		var match = number.match(/\(?(\d*)\)?\s+(\d*)\-?(\d*)/);
		var tel = "tel:+1" + match[1] + match[2] + match[3];

		$(selector).show();
		$(selector).attr("href", tel);
	},

	/**
	 * Switches name around from Last, First to First Last
	 * @param Name in "Last, First" format
	 * @return Name in "First Last" format
	 */
	nameSwitch : function(name) {
		var match = name.match(/([^,]+), ?(.+)/);
		return match[2] + " " + match[1];
	},

	/**
	 * Populate form elements
	 * Perform other page content initialization
	 */
	formsInit : function() {
		var i;
		//Regions filter
		for (i = 0; i < app.regions.length; ++i) {
			$('.region-select ul').append(
				"<li class='" + app.regions[i] + "'><a>" + app.regions[i]  + "</a></li>"
			);
		}

		//Divisions filter
		for (i = 0; i < 4 && i < app.divisions.length; ++i) {
			$('.divis-select1 ul').append(
				"<li class='" + app.divisions[i] + "'><a>" + app.divisions[i] + "</a></li>"
			);
		}
		var lim = 8;
		if (app.divisions.length < 7 && app.divisions.length > 4) {
			$('.divis-select2 ul').append("<li>&nbsp;</li>");
			lim--;
		}
		for (i = 4; i < app.divisions.length; ++i) {
			$('.divis-select2 ul').append(
				"<li class='" + app.divisions[i] + "'><a>" + app.divisions[i] + "</a></li>"
			);
		}
		for (i = app.divisions.length; i < lim; ++i) {
			$('.divis-select2 ul').append("<li>&nbsp;</li>");
		}
		//DivisionsView
		$("#slider-week").on('change',DivisionView.weekUpdate);

		//Setup back hierarchy
		//$('.pageheader a.home').attr("href", "");
		//$('.pageheader a.home').click(app.routeUp);

		//Setup FieldsView
		$("#svg-dump").svg();
	},

	/**
	 * Add listeners to the page
	 */
	addListeners : function() {
		//TeamView
		$('#team .divis-select1 a').click(TeamView.divisionUpdate);
		$('#team .divis-select2 a').click(TeamView.divisionUpdate);
		$('#team .gender-select a').click(TeamView.genderUpdate);
		$('#team .region-select a').click(TeamView.regionUpdate);

		//Setup
		$("#setup #init-region").on('change',DataControl.setupButtonControl);
		$("#setup-status p").on('change',DataControl.setupButtonControl);
		$("#setup-finish").click(DataControl.setupButtonClick);
		$("#setup-finish").prop("disabled", true);

		//DivisonView
		$('#divis .divis-select1 a').click(DivisionView.divisionUpdate);
		$('#divis .divis-select2 a').click(DivisionView.divisionUpdate);
		$('#divis .gender-select a').click(DivisionView.genderUpdate);
		$('#divis .region-select a').click(DivisionView.regionUpdate);
		$('#slider-week').change(DivisionView.weekUpdate);
		$('#divis-submit').click(DivisionView.doSubmit);

		//SavedTeams / Favorite Buttons
		$('.myteam').click(SavedTeamsView.favoriteToggle);
		//$("#flip-team").change(SavedTeamsView.favoriteToggle);

		//Settings
		$("#settings #select-region").change(SettingsView.regionUpdate);
		$("#settings #update").click(SettingsView.refresh);
		$("#settings #reset").click(SettingsView.doReset);
		//*/
		document.addEventListener("backbutton", app.backKeyDown, true);
	},
	
	/**
	 * Handles android hardware back button
	 * Ties into routeUp, or exits if at index
	 */
	backKeyDown : function() {
		console.log("Back key press.");
		if(app.viewStack.length===1) {
			navigator.app.exitApp();
		}
		app.routeUp();
	},

	/**
	 * Add the event listener for the main routing function
	 */
	addRoutingHook : function() {
		//jQueryMobile hooking
		$(document).bind("pagebeforechange", function(e, data) {
			console.log("Running pagebeforechange");
			if (app.firstRoute) {
				//First run -- we want to call route
				console.log("Interceptiong first routing call");
				console.log("  initPage: " + app.initPage);
				app.firstRoute = false;
				app.route(null);
				e.preventDefault();
			}

			if (typeof data.toPage === "string") {
				var u = $.mobile.path.parseUrl(data.toPage);

				if (u.hash.search(app.processableURL) !== -1) {
					data.options.dataUrl = u.href;

					app.route(u, data.options);

					// Kill jQueryMobile's auto-processing
					e.preventDefault();
				} else {
					console.log("URL[" + u.href + "] is not processable");
				}
			}
		});
	},

	/**
	 * Perform app initialization
	 */
	initialize : function() {
		console.log("Initializing App");

		app.db = new WebSqlStore();
		app.data = DataControl;

		//Uncomment to force full data update
		//app.reset();

		console.log("Setup page headers");
		$('.page').prepend($("#site-header").html());

		console.log("Populating filters");
		app.formsInit();

		console.log("Registering events");
		app.addListeners();
		//app.addRoutingHook();

		//Determine page to go to
		if (app.data.isAppSetup()) {
			app.data.updateData();
			app.initPage = location.hash;
			var match = app.initPage.match(/^#?([\w\-_]+[\/\?])?[\w\-_%&=]*$/);
			console.log("Set initPage to " + app.initPage);
		} else {
			console.log("Routing to first run setup");
			app.initPage = "setup";
			app.initStack("setup");
			$(document).delegate("#setup", "pageinit", function() {
				DataControl.downloadInitialData();
			});
			$.mobile.navigate("#setup");
		}
		
		console.log("Initializing router.");
		app.router = new $.mobile.Router(app.routerMatch, app.routerHandlers,
			{ //Router options
				ajaxApp: false,
				firstMatchOnly: true
			}
		);
	},

	/**
	 * Short list of months for date formatting
	 */
	months : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept",
			"Oct", "Nov", "Dec" ],

	/**
	 * Helper function to format the date
	 * @param jour Date string in YYYY-MM-DD
	 * @returns Date in format "<ShortMonth> <Day>" (Eg: Jan 4)
	 */
	formatDate : function(jour) {
		var match = jour.match(/(\d{4})\-(\d{1,2})\-(\d{1,2})/);
		var os = app.months[Number(match[2])-1];
		os += " " + match[3];
		return os;
	},

	/**
	 * Helper function to format the date and time
	 * @param jour Date string 
	 * @param heur Time string
	 * The two are combined with a space and fed into Date() c'tor
	 * @returns Date in format "Jan 4, 2:04 PM"
	 */
	formatDateTime : function(jour, heur) {
		var d = new Date(jour + " " + heur);
		var os = app.months[d.getMonth()];
		os += " " + d.getDate() + ", ";
		var h = d.getHours();
		var am = true;
		var min = d.getMinutes();
		if (h > 11) {
			am = false;
		}
		if (h > 12) {
			h -= 12;
		}
		os += h + ":" + min;
		if (!min){
			os += "0";
		}
		os += " " + ((am) ? "AM" : "PM");
		
		if(isNaN(d.getMinutes())) {
			console.warn("NaN encountered for formatDateTime.\n" +
				"Arguments: "+jour+" - "+heur);
		}
		
		return os;
	},

	/**
	 * Helper function to format time in H:MM AM/PM
	 * @param heur: Time string in format ##:##
	 * @returns {String} H:MM (AM|PM) Ex: 2:04 PM
	 */
	formatTime : function(heur) {
		var match = heur.match(/(\d\d):(\d\d)/);
		var h = match[1];
		var am = true;
		if (h > 11) {
			am = false;
		}
		if (h > 12) {
			h -= 12;
		}
		return h + ":" + match[2] + ((am) ? "AM" : "PM");
	},

	indexURL : /^#?([\w\-_]+)$/,
	detailsURL : /^#?([\w\-_]+)[\/\?]([\w\-_%&=]*)$/,

	//Combination of above two for jQuery hook
	processableURL : /^#?[\w\-_]+([\/\?][\w\-_%&=]*)?$/,

	/**
	 * @brief Determines if <str> is same view as top of <viewStack>
	 * @param str: String of new page hash to check
	 * @returns {Boolean} True if is the same view as the top of <viewStack>
	 * Ex: 'week?1' and 'week?2' would match, 'team' and 'team?1704G' would not
	 */
	matchTop : function(str) {
		var top = app.viewStack[app.viewStack.length - 1];

		if (top.indexOf('?', 0) > 0) {
			top = top.substring(0, top.indexOf('?', 0) + 1);
		}

		if (str.indexOf('?', 0) > 0) {
			str = str.substring(0, str.indexOf('?', 0) + 1);
		}

		return (top === str);
	},

	/**
	 * Initializes stack as much as possible
	 * @param page: Entry pageType (no params) to initialize for
	 * @note app is closely coupled with <route>, and the final
	 *       initiation of pages with params is performed there
	 */
	initStack : function(page) {
		console.log("initStack(" + page + ")");
		switch (page) {
		case WeekView.type:
			// 'week' will be added by route function
			app.viewStack = [ '#index', '#schedules' ];
			break;

		case TeamView.type:
			app.viewStack = [ '#index', '#schedules', '#team' ];
			break;

		case GameView.type:
			//We don't know the path, so have to set index as next up
			app.viewStack = [ '#index', '#game' ];
			break;

		case DivisionView.type:
			app.viewStack = [ '#index', '#schedules', '#divis' ];
			break;

		case SavedTeamsView.type:
			app.viewStack = [ '#index', '#favorites' ];
			break;

		case CancelView.type:
			app.viewStack = [ '#index', '#twitter' ];
			break;

		case SettingsView.type:
			app.viewStack = [ '#index', '#settings' ];
			break;

		case FieldView.type:
			app.viewStack = [ '#index', '#fields' ];
			break;

		case MapView.type:
			//The 'map?' will be added in the route() function
			app.viewStack = [ '#index', '#fields' ];
			break;

		case "schedules":
			app.viewStack = [ '#index', '#schedules' ];
			break;

		case "setup": //We don't want setup in the stack
		default:
			app.viewStack = [ '#index' ];
			break;
		}
		console.log("Initialized ViewStack to ");
		console.log(app.viewStack);
	},

	/**
	 * Pops the top of <viewStack> and routes to the new top
	 */
	routeUp : function() {
		console.log("Route up");
		var last = app.viewStack.pop();
		if (last === "index") {
			route({
				hash : "index"
			});
		}
		
		var top = app.viewStack[app.viewStack.length - 1];
		app.route({
			hash : top
		});

		console.log(app.viewStack);
	},

	/**
	 * Main routing function - Handles all page transitions
	 * @param urlObject contains property hash
	 *        other properties unused
	 * @param options (unused)
	 */
	route : function(urlObject, options) {
		console.log("Running route function");
		var hash;
		if (urlObject === null) {
			hash = app.initPage;
			console.log("Null urlObject -- pulling from initPage");
		} else {
			hash = urlObject.hash;
		}
		
		console.log("Routing to " + hash);

		if (hash === "setup") {
			var $page = $("#setup");
			$page.page();
			$.mobile.changePage($page);
			return;
		}
	},
	
	routeAdd: function(patterns, handlers) {
		for(var i=0; i<patterns.length; ++i) {
			app.routerMatch.push(patterns[i]);
		}
		$.extend(app.routerHandlers, handlers);
	},
	
	routerMatch: [
	    { "([^\\?]+)\\??.*": {events: "s", handler: "stackUpdate" }},
	 	{ "/index.html#index": { events: "i", handler: "ajaxPage" } },
	 	{ "#index": { events: "i", handler: "ajaxPage" } },
	 	{ "#schedules": { events: "i", handler: "ajaxPage" } }
	],
	
	routerHandlers: {
		ajaxPage: function(type,match,ui){
	      console.log("ajaxPage: "+type+" "+match[0]);
	      var params=app.router.getParams(match[1]);
	      console.log(params);
	    },
	    
	    stackUpdate: function(type,match,ui) {
	    	console.log("Do a stack update:");
	    	console.log(match[0]+" / "+match[1]);
	    }
	}
};

$(document).on("mobileinit", app.initialize);

/*
app.router.add(
	[
		{"#$" : { handler: "h", events: "bs" }}
	],
	{
		h: function(eventType, matchObj, ui, page, evt) {
			
		}
	}
);

*/