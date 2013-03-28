var CancelView = {
	type: "twitter",
	
	showTweets: function() {
		if(!document.getElementById("twitter-wjs")) {
			var js= document.createElement("script");
			js.id="twitter-wjs";
			js.src="https://platform.twitter.com/widgets.js";
			$("#twitter .messages").replaceWith(js);
		}
	}
};

app.routeAdd(
	[
	 	{"#twitter" : { handler: "hTwitter", events: "i" }}
	],
	{
		hTwitter: function(eventType, matchObj, ui, page, evt) {
			CancelView.showTweets();
		}
	}
);