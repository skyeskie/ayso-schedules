var WeekView = {
	type: "week",
	
	_maxWeeks: null,
	maxWeeks: function() { 
		return this._maxWeeks;
	},
	
	header: function(cur) {
		var sb = "<div class='week-header'>";
		if(cur > 1) sb += "<a href='#" + this.type + "/" + (Number(cur)-1) + "'>&lt;</a>";
		
		sb += "Week "+cur;
		
		console.log("Printing WeekView header");
		
		if(cur < this.maxWeeks()) sb += "<a href='#" + this.type + "/" + (Number(cur)+1) + "'>&gt;</a>";
		sb += "</div>";
		return sb;
	},
	
	showIndex: function() {
		//TODO: have this default to current/upcoming week
		this.showDetail(1);
	},
	
	showDetail: function(week) {
		$('#main').empty();
		$('#main').append(this.header(week));
		app.store.findByWeek(week, function(rows) {
			app.PrintTableList(Array("Time", "Field", "Home", "Away"),
					rows, Array("Heur", "Field", "Home", "Away"));
		});
		app.currentView = this.type;
	}
};