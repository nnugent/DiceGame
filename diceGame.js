function runTheGame() {
	// runs the actual game
	do{
		let turn = 0;
		let playerHealth = 100;
		let computerHealth = 100;
		let playerAmrmor = getPlayerArmorType();
		let computerArmor = getComputerArmorType();

		while(playerHealth > 0 && computerHealth > 0){
			turn++;
		}
		displayWinner(playerHealth);

	} while(playAgain());
}

function playerTurn() {
	// contains all steps of the players turn
}

function compterTurn() {
	// contains all steps of the computers turn
}

function getHitChance(ability) {
	if (ability === "attack"){
		let roll = rollTheDice(4);
		if (roll === 1) {
			return false;
		} else{
			return true;
		}
	} else {
		return true;
	}
}

function getPlayerArmorType() {
	let invalidInput = true;
	let armorType;
	while(invalidInput){
		armorType = prompt("Do you prefer leather or plate armor?").toLowerCase();
		try{
			if (armorType === "") throw "No input detected, please answer either leather or plate.";
			if (!(armorType === "leather") && !(armorType === "plate")){
				throw "Invalid input, please answer leather or plate.";
			}
			invalidInput = false;
		}catch(err){
			alert(err);
		}
	}
	return armorType;
}

function getComputerArmorType() {
	let armorType;
	if(rollTheDice(2) === 1){
		armorType = "leather";
	}else{
		armorType = "plate";
	}
	return armorType;
}

function getBaseDamage(move) {
	let roll = rollTheDice(16)
	if (move === "attack"){
		return Math.sign(-1) * roll;
	} else{
		return Math.ceil(roll / 2);
	}
}

function getTotalDamage(baseDamage, hit, defenseMultiplier, resistancePenetration, criticalStrikeMultiplier) {
	if(hit){
		let totalDamage;
		totalDamage = baseDamage * criticalStrikeMultiplier;
		totalDamage *= devenseMultiplier - resistancePenetration;
		return totalDamage;
	} else{
		return 0;
	}
}

function getDefenseMultiplier(armorType, element) {
	if(armorType === "leather") {
		if(element === "water" || element === "electric") {
			return .6;
		} else {
			return .8;
		}
	} else if (armorType === "plate") {
		if(element === "fire" || element === "physical") {
			return .6;
		} else {
			return .8;
		}
	}
}

function getResistancePenetration() {
	roll = rollTheDice(8);
	if(roll > 4){
		return (roll - 4) * .04;
	} else{
		return roll * .02;
	}
}

function getElement() {
	roll = rollTheDice(4);
	if(roll === 1){
		return "water";
	} else if (roll === 2){
		return "fire";
	} else if (roll === 3){
		return "electric";
	} else {
		return "physical";
	}
}

function getElementDamage() {
	// Determines element damage bonus
}

function getCriticalStrikeMultiplier(armorType, element) { 
	let critChance = rollTheDice(5);
	if(critChance === 5){
		if (armorType === "leather" && (element === "water" || element === "electric")){
			return 1.3;
		} else if(armorType === "plate" && (element === "fire" || element ==="physical")){
			return 1.3;
		} else if (armorType === "leather" && (element === "fire" || element ==="physical")){
			return 1.7;
		}
		else if(armorType === "plate" && (element === "water" || element === "electric")){
			return 1.7;
		}
	}else{
		return 1;
	}
}

function getFatalBlow(previousHealth) {
	if (previousHealth === 1){
		let roll = rollTheDice(6);
		if (roll <= 4){
			return false;
		} else {
			return true;
		}
	}else{
		let roll = rollTheDice(6);
		if (roll <= 2){
			return false;
		} else {
			return true;
		}
	}
}

function displayHealth(playerHealth, computerHealth) {
	console.log(`You have ${playerHealth} remaining.`);
	console.log(`Your opponent has ${computerHealth} remaining.`);
}

function getComputerMove(computerHealth) {
	if (computerHealth <= 10){
		return "heal";
	} else {
		return "attack";
	}
}

function getPlayerMove() {
	let invalidInput = true;
	let move;
	while(invalidInput){
		move = prompt("Would you like to heal or attack?").toLowerCase();
		try{
			console.log(move);
			if (move === "") throw "No input detected, please answer heal or attack.";
			if (!(move === "attack") && !(move === "heal")){
				throw "Invalid input, please answer heal or attack.";
			}
			invalidInput = false;
		}catch(err){
			alert(err);
		}
	}
	return move;
}

function displayWinner(playerHealth) {
	if (playerHealth > 0){
		alert("Congradulations!!! Your honor & reputation remains intact!!!");
	} else{
		alert("To your upmost disgrace you have been defeated!!!")
	}
}

function playAgain() {
	let invalidInput = true;
	let again;
	while(invalidInput){
		again = prompt("Would you like to play again? (yes or no)").toLowerCase();
		try{
			console.log(again);
			if (again === "") throw "No input detected, please answer yes or no.";
			if (!(again === "yes") && !(again === "no")){
				throw "Invalid input, please answer yes or no.";
			}
			invalidInput = false;
		}catch(err){
			alert(err);
		}
	}
	if (again === "yes"){
		return true;
	} else if (again === "no"){
		return false;
	}
}

function rollTheDice(sidesOfDice) {
	return Math.floor(Math.random() * sidesOfDice) + 1;
}

runTheGame();       