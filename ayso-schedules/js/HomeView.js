var HomeView = {
	type: "index",
	
	html: "<ul class='main'>" +
			"<li><a href='#week'>By week</a></li>" +
			"<li><a href='#field'>By field</a></li>" +
			"<li><a href='#team'>By team</a></li>" +
		  "</ul>",
	
	printView: function() {
		console.log("Printing index");
		$('#main').empty();
		$('#main').append(this.html);
		app.currentView = this.type;
	}
};