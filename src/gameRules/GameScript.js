$(document).ready(function() {
	$('#gameStart').modal("show");
}); 

var computerItem;
var userItem;

$(document).ready(function(){
	if (localStorage.getItem("open") == null){
		localStorage.setItem("open", true);
		localStorage.setItem("first-turn", false);
		localStorage.setItem("item-turn", false);
		localStorage.setItem("complexity", 1);
		localStorage.setItem("scheme", "bright_light");
		localStorage.setItem("game_mode", false);
	} 
});

//main menu
function inmenu() {
	$("#lose").modal("hide");
	$("#win").modal("hide");
	$("#draw").modal("hide");
	$('#win_cross').modal("hide");
    $('#win_circle').modal("hide");
	$("#gameStart").modal("show");
}

function ArrayRandomElement(arr) {
	var rand = Math.floor(Math.random() * arr.length );
	return rand;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

var itemState;
var Center;
var forEasyLvl;

var forHardEdge;
var forHardAngle;

var lose;
var win;
var draw;

async function StartGame() {
	if (localStorage.getItem("game_mode")  == "true") {
		pvpStart()
		return
	}
	switch (localStorage.getItem("complexity")) {
		case "1":
			lose = "loseE"
			win = "winE"
			draw = "drawE"
			break;
		case "2":
			lose = "loseN"
			win = "winN"
			draw = "drawN"
			break;
		case "3":
			lose = "loseH"
			win = "winH"
			draw = "drawH"
			break;		
	}
	Center = true;
	forEasyLvl = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	forHardEdge = [2, 4, 6, 8];
	forHardAngle = [1, 3, 7, 9];
	$(".game-item").removeClass("cross circle");
	$(".game-item").attr("tabindex", "1");
	if (localStorage.getItem("item-turn") == "false") {
		computerItem = "circle";
		userItem = "cross";
	}
	if (localStorage.getItem("item-turn") == "true") {
		computerItem = "cross";
		userItem = "circle";
	}
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
	if(userItem == "cross") {
		$('#startMessage').modal("show");
		await sleep(2000);
		$('#startMessage').modal("hide");
	} else {
		$('#startMessageCircle').modal("show");
		await sleep(2000);
		$('#startMessageCircle').modal("hide");
	}
	if(localStorage.getItem("first-turn") == "true") {
		switch (localStorage.getItem("complexity")) {
			case "1":
				Computer.Easy();
				break;
			case "2":
				Computer.Normal();
				break;
			case "3":
				Computer.Hard();
				break;		
		}
	} else {
		TurnOfGamerAlert();
	}
}

async function TurnOfGamerAlert() {
	$('#yourTurn').modal("show");
	await sleep(800);
	$('#yourTurn').modal("hide");
}

$(".game-item").click(function(){
	if (localStorage.getItem("game_mode") != "true") {
		let elem = event.target
		let item = elem.getAttribute("id");
		if (itemState[item]["toGame"]) {
			if (item == "item5") {
				Center = false;
			}
			forEasyLvl.splice(forEasyLvl.indexOf(Number(item[4])), 1);
			if (forHardEdge.indexOf(Number(item[4])) != -1) {
				forHardEdge.splice(forHardEdge.indexOf(Number(item[4])), 1);
			}
			if (forHardAngle.indexOf(Number(item[4])) != -1) {
				forHardAngle.splice(forHardAngle.indexOf(Number(item[4])), 1);
			}
			elem.removeAttribute("tabindex");
			elem.classList.add(userItem);
			itemState[item]["value"] = userItem;
			itemState[item]["toGame"] = false;
			gameCompletioncCheckByGamer(); 
		}
	}	
});

$(".game-item").keypress(function(){
	if (localStorage.getItem("game_mode") != "true") {
		let elem = event.target;
		let item = elem.getAttribute("id");
		if (itemState[item]["toGame"]) {
			if (item == "item5") {
				Center = false;
			}
			forEasyLvl.splice(forEasyLvl.indexOf(Number(item[4])), 1);
			if (forHardEdge.indexOf(Number(item[4])) != -1) {
				forHardEdge.splice(forHardEdge.indexOf(Number(item[4])), 1);
			}
			if (forHardAngle.indexOf(Number(item[4])) != -1) {
				forHardAngle.splice(forHardAngle.indexOf(Number(item[4])), 1);
			}
			elem.removeAttribute("tabindex");
			elem.classList.add(userItem);
			itemState[item]["value"] = userItem;
			itemState[item]["toGame"] = false;
			gameCompletioncCheckByGamer(); 
		}
	}
});

async function gameCompletioncCheckByGamer() {
	if (
		(itemState["item1"]["value"] == userItem && itemState["item2"]["value"] == userItem && itemState["item3"]["value"] == userItem) ||
		(itemState["item4"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item6"]["value"] == userItem) ||
		(itemState["item7"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
		(itemState["item1"]["value"] == userItem && itemState["item4"]["value"] == userItem && itemState["item7"]["value"] == userItem) ||
		(itemState["item2"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item8"]["value"] == userItem) ||
		(itemState["item3"]["value"] == userItem && itemState["item6"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
		(itemState["item1"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
		(itemState["item3"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item7"]["value"] == userItem)
	) {
		localStorage.setItem(win, Number(localStorage.getItem(win))+1);
		$('#win').modal("show");
		return
	} else { 
		if ( itemState["item1"]["toGame"] == false && itemState["item2"]["toGame"] == false && itemState["item3"]["toGame"] == false &&
			 itemState["item4"]["toGame"] == false && itemState["item5"]["toGame"] == false && itemState["item6"]["toGame"] == false &&
			 itemState["item7"]["toGame"] == false && itemState["item8"]["toGame"] == false && itemState["item9"]["toGame"] == false
		) {
			$("#draw").modal("show");
			localStorage.setItem(draw, Number(localStorage.getItem(draw))+1);
			return
		} else { 
			switch (localStorage.getItem("complexity")) {
				case "1":
					Computer.Easy();
					break;
				case "2":
					Computer.Normal();
					break;
				case "3":
					Computer.Hard();
					break;		
			}
		}
	}
}

async function gameCompletioncCheckByComputer() {
	if (
		(itemState["item1"]["value"] == computerItem && itemState["item2"]["value"] == computerItem && itemState["item3"]["value"] == computerItem) ||
		(itemState["item4"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item6"]["value"] == computerItem) ||
		(itemState["item7"]["value"] == computerItem && itemState["item8"]["value"] == computerItem && itemState["item9"]["value"] == computerItem) ||
		(itemState["item1"]["value"] == computerItem && itemState["item4"]["value"] == computerItem && itemState["item7"]["value"] == computerItem) ||
		(itemState["item2"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item8"]["value"] == computerItem) ||
		(itemState["item3"]["value"] == computerItem && itemState["item6"]["value"] == computerItem && itemState["item9"]["value"] == computerItem) ||
		(itemState["item1"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item9"]["value"] == computerItem) ||
		(itemState["item3"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item7"]["value"] == computerItem)
	 ) {
		$('#computerTurn').modal("hide");
		localStorage.setItem(lose, Number(localStorage.getItem(lose))+1);
		$('#lose').modal("show");
		return
	} else { 
		if ( itemState["item1"]["toGame"] == false && itemState["item2"]["toGame"] == false && itemState["item3"]["toGame"] == false &&
			 itemState["item4"]["toGame"] == false && itemState["item5"]["toGame"] == false && itemState["item6"]["toGame"] == false &&
			 itemState["item7"]["toGame"] == false && itemState["item8"]["toGame"] == false && itemState["item9"]["toGame"] == false
		) {
			$('#computerTurn').modal("hide");
			$("#draw").modal("show");
			localStorage.setItem(draw, Number(localStorage.getItem(draw))+1);
			return
		} else { 
			$('#computerTurn').modal("hide");
			TurnOfGamerAlert(); 
		}
	} 
}

class Computer {
	static async Hard() {
		$('#computerTurn').modal("show");
		var	gameItem;
			if (itemState["item5"]["toGame"]) {
				await sleep(1500);
				var elemc = document.getElementById("item5");
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item5"]["toGame"] = false;
				itemState["item5"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(5), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(5), 1);
				forHardAngle.splice(forHardAngle.indexOf(5), 1);
				gameCompletioncCheckByComputer();
				return;	
			}
			for(let i = 1; i < 10; i++){
				gameItem = "item" + i;
				if(itemState[gameItem]["toGame"]){
					itemState[gameItem]["value"] = computerItem;
					if (
						(itemState["item1"]["value"] == computerItem && itemState["item2"]["value"] == computerItem && itemState["item3"]["value"] == computerItem) ||
						(itemState["item4"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item6"]["value"] == computerItem) ||
						(itemState["item7"]["value"] == computerItem && itemState["item8"]["value"] == computerItem && itemState["item9"]["value"] == computerItem) ||
						(itemState["item1"]["value"] == computerItem && itemState["item4"]["value"] == computerItem && itemState["item7"]["value"] == computerItem) ||
						(itemState["item2"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item8"]["value"] == computerItem) ||
						(itemState["item3"]["value"] == computerItem && itemState["item6"]["value"] == computerItem && itemState["item9"]["value"] == computerItem) ||
						(itemState["item1"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item9"]["value"] == computerItem) ||
						(itemState["item3"]["value"] == computerItem && itemState["item5"]["value"] == computerItem && itemState["item7"]["value"] == computerItem)
					) {
						var elemc = document.getElementById(gameItem);
						await sleep(1500);
						elemc.classList.add(computerItem);
						elemc.removeAttribute("tabindex");
						itemState[gameItem]["toGame"] = false;
						itemState[gameItem]["value"] = computerItem;
						gameCompletioncCheckByComputer();
						return;
					} 
					itemState[gameItem]["value"] = "NaN";
				}
			}
			for(let i = 1; i < 10; i++){
				gameItem = "item" + i;
				if(itemState[gameItem]["toGame"]){
					itemState[gameItem]["value"] = userItem;	
					if (
						(itemState["item1"]["value"] == userItem && itemState["item2"]["value"] == userItem && itemState["item3"]["value"] == userItem) ||
						(itemState["item4"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item6"]["value"] == userItem) ||
						(itemState["item7"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
						(itemState["item1"]["value"] == userItem && itemState["item4"]["value"] == userItem && itemState["item7"]["value"] == userItem) ||
						(itemState["item2"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item8"]["value"] == userItem) ||
						(itemState["item3"]["value"] == userItem && itemState["item6"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
						(itemState["item1"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
						(itemState["item3"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item7"]["value"] == userItem)
					) {
						var elemc = document.getElementById(gameItem);
						await sleep(1500);
						elemc.classList.add(computerItem);
						elemc.removeAttribute("tabindex");
						itemState[gameItem]["toGame"] = false;
						itemState[gameItem]["value"] = computerItem;
						forHardEdge.splice(forHardEdge.indexOf(i), 1);
						forEasyLvl.splice(forEasyLvl.indexOf(i), 1);
						forHardAngle.splice(forHardAngle.indexOf(i), 1);
						gameCompletioncCheckByComputer();
						return;	
					}
					itemState[gameItem]["value"] = "NaN";
				}
			}
			if (itemState["item2"]["value"] == userItem && itemState["item4"]["value"] == userItem && itemState["item1"]["toGame"]) {
				var elemc = document.getElementById("item1");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item1"]["toGame"] = false;
				itemState["item1"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(1), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(1), 1);
				forHardAngle.splice(forHardAngle.indexOf(1), 1);
				gameCompletioncCheckByComputer();
				return;		
			} else if (itemState["item2"]["value"] == userItem && itemState["item6"]["value"] == userItem && itemState["item3"]["toGame"]) {
				var elemc = document.getElementById("item3");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item3"]["toGame"] = false;
				itemState["item3"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(3), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(3), 1);
				forHardAngle.splice(forHardAngle.indexOf(3), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item4"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item7"]["toGame"]) {
				var elemc = document.getElementById("item7");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item7"]["toGame"] = false;
				itemState["item7"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(7), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(7), 1);
				forHardAngle.splice(forHardAngle.indexOf(7), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item6"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item9"]["toGame"]) {
				var elemc = document.getElementById("item9");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item9"]["toGame"] = false;
				itemState["item9"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(9), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(9), 1);
				forHardAngle.splice(forHardAngle.indexOf(9), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item3"]["value"] == userItem && itemState["item4"]["value"] == userItem && itemState["item2"]["toGame"]) {
				var elemc = document.getElementById("item2");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item2"]["toGame"] = false;
				itemState["item2"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(2), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(2), 1);
				forHardAngle.splice(forHardAngle.indexOf(2), 1);
				gameCompletioncCheckByComputer();
				return;		
			} else if (itemState["item1"]["value"] == userItem && itemState["item6"]["value"] == userItem && itemState["item2"]["toGame"]) {
				var elemc = document.getElementById("item2");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item2"]["toGame"] = false;
				itemState["item2"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(2), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(2), 1);
				forHardAngle.splice(forHardAngle.indexOf(2), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item3"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item6"]["toGame"]) {
				var elemc = document.getElementById("item6");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item6"]["toGame"] = false;
				itemState["item6"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(6), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(6), 1);
				forHardAngle.splice(forHardAngle.indexOf(6), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item1"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item4"]["toGame"]) {
				var elemc = document.getElementById("item4");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item4"]["toGame"] = false;
				itemState["item4"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(4), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(4), 1);
				forHardAngle.splice(forHardAngle.indexOf(4), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item7"]["value"] == userItem && itemState["item2"]["value"] == userItem && itemState["item4"]["toGame"]) {
				var elemc = document.getElementById("item4");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item4"]["toGame"] = false;
				itemState["item4"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(4), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(4), 1);
				forHardAngle.splice(forHardAngle.indexOf(4), 1);
				gameCompletioncCheckByComputer();
				return;	
			}	else if (itemState["item7"]["value"] == userItem && itemState["item6"]["value"] == userItem && itemState["item8"]["toGame"]) {
				var elemc = document.getElementById("item8");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item8"]["toGame"] = false;
				itemState["item8"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(8), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(8), 1);
				forHardAngle.splice(forHardAngle.indexOf(8), 1);
				gameCompletioncCheckByComputer();
				return;	
			}	else if (itemState["item9"]["value"] == userItem && itemState["item2"]["value"] == userItem && itemState["item6"]["toGame"]) {
				var elemc = document.getElementById("item6");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item6"]["toGame"] = false;
				itemState["item6"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(6), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(6), 1);
				forHardAngle.splice(forHardAngle.indexOf(6), 1);
				gameCompletioncCheckByComputer();
				return;	
			} else if (itemState["item9"]["value"] == userItem && itemState["item4"]["value"] == userItem && itemState["item8"]["toGame"]) {
				var elemc = document.getElementById("item8");
				await sleep(1500);
				elemc.classList.add(computerItem);
				elemc.removeAttribute("tabindex");
				itemState["item8"]["toGame"] = false;
				itemState["item8"]["value"] = computerItem;
				forHardEdge.splice(forHardEdge.indexOf(8), 1);
				forEasyLvl.splice(forEasyLvl.indexOf(8), 1);
				forHardAngle.splice(forHardAngle.indexOf(8), 1);
				gameCompletioncCheckByComputer();
				return;	
			}		
			if (Center && forHardEdge.length != 0) {
					await sleep(1500);
					let i = ArrayRandomElement(forHardEdge);
					let itemValue = forHardEdge[i] 
					gameItem = "item" + forHardEdge[i];
					var elemc = document.getElementById(gameItem);
					elemc.classList.add(computerItem);
					elemc.removeAttribute("tabindex");
					itemState[gameItem]["toGame"] = false;
					itemState[gameItem]["value"] = computerItem;
					forHardEdge.splice(forHardEdge.indexOf(itemValue), 1);
					forEasyLvl.splice(forEasyLvl.indexOf(itemValue), 1);
					gameCompletioncCheckByComputer();
					return;
			} else {
				if (forHardAngle.length != 0) {
					await sleep(1500);
					let i = ArrayRandomElement(forHardAngle);
					gameItem = "item" + forHardAngle[i];
					let itemValue = forHardEdge[i] 
					var elemc = document.getElementById(gameItem);
					elemc.classList.add(computerItem);
					elemc.removeAttribute("tabindex");
					itemState[gameItem]["toGame"] = false;
					itemState[gameItem]["value"] = computerItem;
					forHardAngle.splice(forHardAngle.indexOf(itemValue), 1);
					forEasyLvl.splice(forEasyLvl.indexOf(itemValue), 1);
					gameCompletioncCheckByComputer();
					return;
				} else {
					let i = ArrayRandomElement(forEasyLvl);
					var gameItem = "item" + forEasyLvl[i];
					let itemValue = forEasyLvl[i] 
					$('#computerTurn').modal("show");
					var elemc = document.getElementById(gameItem);
					await sleep(1500);
					elemc.classList.add(computerItem);
					elemc.removeAttribute("tabindex");
					itemState[gameItem]["toGame"] = false;
					itemState[gameItem]["value"] = computerItem;
					forHardAngle.splice(forHardAngle.indexOf(itemValue), 1);
					forEasyLvl.splice(forEasyLvl.indexOf(itemValue), 1);
					forHardEdge.splice(forHardEdge.indexOf(itemValue), 1);
					gameCompletioncCheckByComputer();
					return;	
				}
			}
		}

	static async Easy() {
		let i = ArrayRandomElement(forEasyLvl);
		var gameItem = "item" + forEasyLvl[i];
		$('#computerTurn').modal("show");
		var elemc = document.getElementById(gameItem);
		await sleep(1500);
		elemc.classList.add(computerItem);
		elemc.removeAttribute("tabindex");
		itemState[gameItem]["toGame"] = false;
		itemState[gameItem]["value"] = computerItem;
		forEasyLvl.splice(i, 1);
		gameCompletioncCheckByComputer();
		return;		
	}

	static async Normal() {
		$('#computerTurn').modal("show");
		var	gameItem;
		if (itemState["item5"]["toGame"]) {
			await sleep(1500);
			var elemc = document.getElementById("item5");
			elemc.classList.add(computerItem);
			elemc.removeAttribute("tabindex");
			itemState["item5"]["toGame"] = false;
			itemState["item5"]["value"] = computerItem;
			forEasyLvl.splice(forEasyLvl.indexOf(5), 1);
			gameCompletioncCheckByComputer();
			return;	
		}	
		for(let i = 1; i < 10; i++){
			gameItem = "item" + i;
			if(itemState[gameItem]["toGame"]){
				itemState[gameItem]["value"] = userItem;	
				if (
					(itemState["item1"]["value"] == userItem && itemState["item2"]["value"] == userItem && itemState["item3"]["value"] == userItem) ||
					(itemState["item4"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item6"]["value"] == userItem) ||
					(itemState["item7"]["value"] == userItem && itemState["item8"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
					(itemState["item1"]["value"] == userItem && itemState["item4"]["value"] == userItem && itemState["item7"]["value"] == userItem) ||
					(itemState["item2"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item8"]["value"] == userItem) ||
					(itemState["item3"]["value"] == userItem && itemState["item6"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
					(itemState["item1"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item9"]["value"] == userItem) ||
					(itemState["item3"]["value"] == userItem && itemState["item5"]["value"] == userItem && itemState["item7"]["value"] == userItem)
				) {
					await sleep(1500);
					var elemc = document.getElementById(gameItem);
					elemc.classList.add(computerItem);
					elemc.removeAttribute("tabindex");
					itemState[gameItem]["toGame"] = false;
					itemState[gameItem]["value"] = computerItem;
					forEasyLvl.splice(forEasyLvl.indexOf(i), 1);
					gameCompletioncCheckByComputer();
					return;	
				}
				itemState[gameItem]["value"] = "NaN";
			}
		}
			let i = ArrayRandomElement(forEasyLvl);
			var gameItem = "item" + forEasyLvl[i];
			$('#computerTurn').modal("show");
			await sleep(1500);
			var elemc = document.getElementById(gameItem);
			elemc.classList.add(computerItem);
			elemc.removeAttribute("tabindex");
			itemState[gameItem]["toGame"] = false;
			itemState[gameItem]["value"] = computerItem;
			forEasyLvl.splice(i, 1);
			gameCompletioncCheckByComputer();
		return;	
	}
}

