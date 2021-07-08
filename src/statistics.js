function statistics() {
	$("#gameStart").modal("hide");
	$("#lose").modal("hide");
	$("#win").modal("hide");
	$("#draw").modal("hide");
	$('#win_cross').modal("hide");
    $('#win_circle').modal("hide");
	$("#statistics").modal("show");

	$(".nav-link").click(() => {
		$(".nav-link").blur();	
	});

	//win easy
	let winE  = Number(localStorage.getItem("winE"));
	let	loseE = Number(localStorage.getItem("loseE"));
	let	drawE = Number(localStorage.getItem("drawE"));

	$(".stat-draw-easy").html(drawE);
	$(".stat-lose-easy").html(loseE);
	$(".stat-win-easy").html(winE);
	$(".stat-all-easy").html(drawE+winE+loseE);
	$(".stat-winrate-easy").html( Math.floor((100*(winE)/(winE+loseE+drawE))) + "%" );
	if ( (winE+loseE+drawE) == 0 ) {
		$(".stat-winrate-easy").html("0%");
	}

	//win normal
	let winN  = Number(localStorage.getItem("winN"));
	let	loseN = Number(localStorage.getItem("loseN"));
	let	drawN = Number(localStorage.getItem("drawN"));

	$(".stat-draw-normal").html(drawN);
	$(".stat-lose-normal").html(loseN);
	$(".stat-win-normal").html(winN);
	$(".stat-all-normal").html(drawN + winN + loseN);
	$(".stat-winrate-normal").html( Math.floor((100*(winN)/(winN+loseN+drawN))) + "%" );
	if ( (winN+loseN+drawN) == 0 ) {
		$(".stat-winrate-normal").html("0%");
	}

	//win hard
	let winH  = Number(localStorage.getItem("winH"));
	let	loseH = Number(localStorage.getItem("loseH"));
	let	drawH = Number(localStorage.getItem("drawH"));

	$(".stat-draw-hard").html(drawH);
	$(".stat-lose-hard").html(loseH);
	$(".stat-win-hard").html(winH);
	$(".stat-all-hard").html(drawH+winH+loseH);
	$(".stat-winrate-hard").html( Math.floor((100*(winH)/(winH+loseH+drawH))) + "%" );
	if ( (winH+loseH+drawH) == 0 ) {
		$(".stat-winrate-hard").html("0%");
	}

	$(".nav-link.active").attr("aria-selected", false);
	$(".nav-link.active").removeClass("active");
	$(".nav-link.active").removeAttr("tabindex");
	$(".tab-pane.active.show").removeClass("active");
	$(".tab-pane.show").removeClass("show");

	switch (localStorage.getItem("complexity")) {
		case "1":
			$("#easy-tab").addClass("active");
			$("#easy").addClass("active");
			$("#easy").addClass("show");
			$("#easy-tab").attr("aria-selected", true);
			break;
		case "2":
			$("#normal-tab").addClass("active");
			$("#normal").addClass("active");
			$("#normal").addClass("show");
			$("#normal-tab").attr("aria-selected", true);
			break;
		case "3":
			$("#hard-tab").addClass("active");
			$("#hard").addClass("active");
			$("#hard").addClass("show");
			$("#hard-tab").attr("aria-selected", true);
			break;
	}

}

function backStat() {
	$("#statistics").modal("hide");
	$("#gameStart").modal("show");
}