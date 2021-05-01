$(document).ready(function() {
	setTimeout( function(){
		if(!$("#page-preloader").hasClass('done')){
			$("#page-preloader").addClass('done');
			$(".content").css({"display":"block"});
		}
	}, 1000);
}
);