$(document).bind("mobileinit", function(){
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.mobile.defaultPageTransition = "slide";
	$.extend(  $.mobile , {
		//ajaxEnabled: false,
		//hashListeningEnabled: false
	});
});//*/