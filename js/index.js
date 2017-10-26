$(function(){
	var scroll = $(document).scroll(function(event) {
		/* Act on the event */
			var a = $('#lesson').offset();
	var screen = $(window).height();
	var documentH=$(document).height();
		console.log($(this).scrollTop());
		console.log('lesson offset'+a.top);
		console.log(screen);
		console.log(documentH);
		if(($(this).scrollTop())>a.top){
			$(this).scrollTop(a.top);
		}
	});
});