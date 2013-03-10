var app = {
	/**
	 * Region information for the app.
	 */
	regions : [ "49", "105", "208", "253", "491" ],
	divisions : [ "U6", "U8", "U10", "U12", "U14", "U19" ],
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
		for (i = 0; i < this.regions.length; ++i) {
			$('.region-select ul').append(
					"<li><a>" + this.regions[i] + "</a></li>");
		}

		//Divisions filter
		for (i = 0; i < 4 && i < this.divisions.length; ++i) {
			$('.divis-select1 ul').append(
					"<li><a>" + this.divisions[i] + "</a></li>");
		}
		if (this.divisions.length < 7) {
			$('.divis-select2 ul').append("<li>&nbsp;</li>");
		}
		for (i = 4; i < this.divisions.length; ++i) {
			$('.divis-select2 ul').append(
					"<li><a>" + this.divisions[i] + "</a></li>");
		}
		for (i = this.divisions.length; i < 7; ++i) {
			$('.divis-select2 ul').append("<li>&nbsp;</li>");
		}
		//DivisionsView
		//$("#slider-week")

		//Setup back hierarchy
		$('.pageheader a.home').attr("href", "");
		$('.pageheader a.home').click(app.routeUp);

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
		$("#setup :radio").change(DataControl.setupButtonControl);
		$("#setup-status p").change(DataControl.setupButtonControl);
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
		//$('.myteam').click(SavedTeamsView.favoriteToggle);
		$("#flip-team").change(SavedTeamsView.favoriteToggle);

		//Settings
		$("#settings #select-region").change(SettingsView.regionUpdate);
		$("#settings #update").click(SettingsView.refresh);
		$("#settings #reset").click(SettingsView.doReset);
		
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
				console.log("  initPage: " + this.initPage);
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

		this.db = new WebSqlStore();
		this.data = DataControl;

		//Uncomment to force full data update
		//this.reset();

		console.log("Setup page headers");
		$('.page').prepend($("#site-header").html());

		console.log("Populating filters");
		this.formsInit();

		console.log("Registering events");
		this.addListeners();
		this.addRoutingHook();

		//Determine page to go to
		if (this.data.isAppSetup()) {
			this.data.updateData();
			this.initPage = location.hash;
			var match = this.initPage.match(/^#?([\w\-_]+[\/\?])?[\w\-_%&=]*$/);
			console.log("Set initPage to " + this.initPage);
		} else {
			console.log("Routing to first run setup");
			this.initPage = "setup";
			this.initStack("setup");
			$(document).delegate("#setup", "pageinit", function() {
				DataControl.downloadInitialData();
			});
		}
	},

	/**
	 * Short list of months for date formatting
	 */
	months : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept",
			"Oct", "Nov", "Dec" ],

	/**
	 * Helper function to format the date
	 * @param jour Date string in any format accepted by Date() c'tor
	 * @returns Date in format "<ShortMonth> <Day>" (Eg: Jan 4)
	 */
	formatDate : function(jour) {
		var d = new Date(jour);
		var os = app.months[d.getMonth()];
		os += " " + d.getDate();
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
	 * @note This is closely coupled with <route>, and the final
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

		case ScheduleHome.type:
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
			hash = this.initPage;
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

		if (!hash || hash === "index" || hash === "#index" || hash === "") {
			HomeView.printView();
			//Reset the stack
			app.viewStack = [ '#index' ];
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
			if (match) {
				isIndex = false;
				filterType = match[1];
				offset = match[2];
			} else {
				console.error("Unexpected hash pattern: '" + hash + "'");
				HomeView.printView();
				return;
			}

		}

		if (app.viewStack === null) {
			app.initStack(filterType);
		}
		
		if (app.matchTop(hash)) {
			//We want a replace if it's a sideways move (week?8 to week?9)
			app.viewStack.pop();
		}
		app.viewStack.push(hash);
		console.log(app.viewStack);

		switch (filterType) {
		case WeekView.type:
			if (isIndex) {
				WeekView.showIndex();
			} else {
				WeekView.showDetail(offset);
			}
			break;

		case TeamView.type:
			if (isIndex) {
				TeamView.showIndex();
			} else {
				TeamView.showDetail(offset);
			}
			break;

		case GameView.type:
			if (isIndex) {
				GameView.showIndex();
			} else {
				GameView.showDetail(offset);
			}
			break;

		case DivisionView.type:
			if (isIndex) {
				DivisionView.showIndex();
			} else {
				DivisionView.showDetail(offset);
			}
			break;

		case SavedTeamsView.type:
			if (isIndex) {
				SavedTeamsView.showIndex();
			} else {
				SavedTeamsView.showDetail(offset);
			}
			break;

		case CancelView.type:
			CancelView.showIndex();
			break;

		case SettingsView.type:
			SettingsView.showIndex();
			break;

		case FieldView.type:
			if (isIndex) {
				FieldView.showIndex();
			} else {
				FieldView.showDetail(offset);
			}
			break;

		case MapView.type:
			if (isIndex) {
				MapView.showIndex();
			} else {
				MapView.showDetail(offset);
			}
			break;

		case ScheduleHome.type:
			ScheduleHome.showIndex();
			break;

		case "debug":
			$("#debug").page();
			$.mobile.changePage( $("#debug") );
			break;
			
		default:
			console.error("Unexpected page type: '" + filterType + "'");
			app.viewStack.pop(); //No change
			break;
		}
		return;
	}
};

app.initialize();