$(document).bind("mobileinit", function(){
	$.mobile.selectmenu.prototype.options.nativeMenu = false;
	$.extend(  $.mobile , {
		ajaxEnabled: false,
		hashListeningEnabled: false
	});
});//*/