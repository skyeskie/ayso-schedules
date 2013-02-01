var FieldView = {
	type: "field",
	
	showIndex: function() {
		$('#main').empty();
		app.store.getFieldList(this.printFieldList);
		
	},
	
	printFieldList: function(rows) {
		if(rows==null) {
			$('#main').append("No fields found");
		}
		
		for(var i=0; i< rows.length; ++i) {
			var field = rows.item(i).Field;
			$('#main').append("<a href='#"+
					FieldView.type+"/"+encodeURI(field)+"'>"+
					field+"</a><br />"
			);
		}
	},
	
	showDetail: function(field) {
		$('#main').empty();
		app.store.findByField(field, function(rows) {
			app.PrintTableList(Array("Day", "Time", "Home", "Away"),
					rows, Array("Jour", "Heur", "Home", "Away"));
		});
	}
};