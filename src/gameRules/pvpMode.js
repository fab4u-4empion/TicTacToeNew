var currentItem

function pvpStart() {
    $(".game-item").removeClass("cross circle");
	$(".game-item").attr("tabindex", "1");
    currentItem = "cross"
	itemState = {
		"item1": {
			"value": "NaN",
			"toGame": true,
		},

		"item2": {
			"value": "NaN",
			"toGame": true,
		},

		"item3": {
			"value": "NaN",
			"toGame": true,
		},

		"item4": {
			"value": "NaN",
			"toGame": true,
		},

		"item5": {
			"value": "NaN",
			"toGame": true,
		},

		"item6": {
			"value": "NaN",
			"toGame": true,
		},

		"item7": {
			"value": "NaN",
			"toGame": true,
		},

		"item8": {
			"value": "NaN",
			"toGame": true,
		},

		"item9": {
			"value": "NaN",
			"toGame": true,
		}
	}; 
	$('#gameStart').modal("hide");
	$('#win').modal("hide");
	$('#lose').modal("hide");
	$('#draw').modal("hide");  
    $('#win_cross').modal("hide");
    $('#win_circle').modal("hide");
    $('#startMessagePVP').modal("show");
    setTimeout(() => {
        $('#startMessagePVP').modal("hide"); 
    }, 2000) 
}

function turnPVP(elem) {
		let item = elem.getAttribute("id");
		if (itemState[item]["toGame"]) {
			elem.removeAttribute("tabindex");
			elem.classList.add(currentItem);
			itemState[item]["value"] = currentItem;
			itemState[item]["toGame"] = false;
		}
}

function check() {
    if (
		(itemState["item1"]["value"] == currentItem && itemState["item2"]["value"] == currentItem && itemState["item3"]["value"] == currentItem) ||
		(itemState["item4"]["value"] == currentItem && itemState["item5"]["value"] == currentItem && itemState["item6"]["value"] == currentItem) ||
		(itemState["item7"]["value"] == currentItem && itemState["item8"]["value"] == currentItem && itemState["item9"]["value"] == currentItem) ||
		(itemState["item1"]["value"] == currentItem && itemState["item4"]["value"] == currentItem && itemState["item7"]["value"] == currentItem) ||
		(itemState["item2"]["value"] == currentItem && itemState["item5"]["value"] == currentItem && itemState["item8"]["value"] == currentItem) ||
		(itemState["item3"]["value"] == currentItem && itemState["item6"]["value"] == currentItem && itemState["item9"]["value"] == currentItem) ||
		(itemState["item1"]["value"] == currentItem && itemState["item5"]["value"] == currentItem && itemState["item9"]["value"] == currentItem) ||
		(itemState["item3"]["value"] == currentItem && itemState["item5"]["value"] == currentItem && itemState["item7"]["value"] == currentItem)
	) {
		$('#win_' + currentItem).modal("show");
		return
	} else { 
		if ( itemState["item1"]["toGame"] == false && itemState["item2"]["toGame"] == false && itemState["item3"]["toGame"] == false &&
			 itemState["item4"]["toGame"] == false && itemState["item5"]["toGame"] == false && itemState["item6"]["toGame"] == false &&
			 itemState["item7"]["toGame"] == false && itemState["item8"]["toGame"] == false && itemState["item9"]["toGame"] == false
		) {
			$("#draw").modal("show");
			return
		}
    }
}

$(".game-item").click(function(){
	if (localStorage.getItem("game_mode") == "true") {
        let elem = event.target
        turnPVP(elem)
        check()
        currentItem == "cross" ? currentItem = "circle" : currentItem = "cross"
        return
	}	
});

$(".game-item").keypress(function() {
	if (localStorage.getItem("game_mode") == "true") {
        let elem = event.target
        turnPVP(elem)
        check()
        currentItem == "cross" ? currentItem = "circle" : currentItem = "cross"
        return
	}
});