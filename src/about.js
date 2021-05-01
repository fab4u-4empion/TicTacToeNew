function about() {
	$("#gameStart").modal("hide");
	$("#about").modal("show");
	$.getJSON("../package.json", function(data){
		$(".about-dev").html(data.developer + ", " + data.author);
		$(".about-version").html(data.version);
		$(".about-date").html(data.date);
		$(".about-electron").html(data.dependencies["electron"]);
		$(".about-jq").html(data.dependencies["jquery"]);
	});
}

function backAbout() {
	$("#about").modal("hide");
	$("#gameStart").modal("show");
}

$(function () {
	$('[data-toggle="tooltip"]').tooltip({
		delay: { show: 1000, hide: 150 }
	})
})

//first turn
$(document).ready(function(){
	if (localStorage.getItem('first-turn') == "true") { 
		$("#change_turn").attr("checked", "true");
	}
});

$("#change_turn").change(function() {
	this.blur();
	if (localStorage.getItem('first-turn') == "true") {
		localStorage.setItem('first-turn', false);
	} else {
		localStorage.setItem('first-turn', true);
	}
});



//item turn
$(document).ready(function(){
	if (localStorage.getItem('item-turn') == "true") { 
		$("#change_turn").attr("checked", "true");
	}
});

$("#change_item").change(function() {
	this.blur();
	if (localStorage.getItem('item-turn') == "true") {
		localStorage.setItem('item-turn', false);
	} else {
		localStorage.setItem('item-turn', true);
	}
});


//darck theme
$(document).ready(function(){
	if (localStorage.getItem("scheme") == "space_gray") { 
		$("#change_theme").attr("checked", "true");
	}
});

$("#change_theme").change(function() {
	this.blur();
	if (localStorage.getItem("scheme") == "bright_light") {
		localStorage.setItem("scheme", "space_gray");
	} else {
		localStorage.setItem("scheme", "bright_light");
	}
	$("#main").attr("scheme", localStorage.getItem("scheme"));
});



//complexity
$("#range").change(function() {
	$(".settings__lvl").removeClass("settings__lvl-bold");
	var elem = ".settings__lvl-" + $("#range").val();
	$(elem).addClass("settings__lvl-bold");
	localStorage.setItem("complexity", $("#range").val());
});

$(document).ready(function() {
	switch (localStorage.getItem("complexity")) {
		case "1":
			$("#range").val(1);
			$(".settings__lvl-1").addClass("settings__lvl-bold");
			break;
		case "2":
			$("#range").val(2);
			$(".settings__lvl-2").addClass("settings__lvl-bold");
			break;

		case "3":
			$("#range").val(3);
			$(".settings__lvl-3").addClass("settings__lvl-bold");
			break;
	}
});

