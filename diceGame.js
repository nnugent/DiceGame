function runTheGame() {
	// runs the actual game
	do{
		let turn = 0;
		let playerHealth = 100;
		let computerHealth = 100;
		let playerAmrmor = determinePlayerArmorType();
		let computerArmor = determineComputerArmorType();

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

function determineHit(ability) {
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

function determinePlayerArmorType() {
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

function determineComputerArmorType() {
	let armorType;
	if(rollTheDice(2) === 1){
		armorType = "leather";
	}else{
		armorType = "plate";
	}
	return armorType;
}

function determineBaseDamage() {
	// Determines base damage or healing value
}

function determineTotalDamage(baseDamage, hit, armorType, element, resistance, criticalStrike) {
	// body...
}

function determineResistancePenetration() {
	// Calculates your resistance penetration 
}

function elementRoll() {
	// Determines the element of the your attack
}

function elementDamage() {
	// Determines element damage bonus
}

function criticalStrikeMultiplyer(armorType, element) { 
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

function fatalBlow(previousHealth) {
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

function computerMove(computerHealth) {
	if (computerHealth <= 10){
		return "heal";
	} else {
		return "attack";
	}
}

function playerMove() {
	// Determines whether the player wishes to heal or attack
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