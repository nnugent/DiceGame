function runTheGame() {
	// runs the actual game
	do{

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
		let roll = Math.floor(Math.random() * 4)+ 1;
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
			console.log(armorType);
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
	if(Math.floor(Math.random() * 2) + 1 === 1){
		armorType = "leather";
	}else{
		armorType = "plate";
	}
	return armorType;
}

function determineDamage() {
	// Determines base damage or healing value
}

function determineResistancePenetration() {
	// Calculates your resistance penetration 
}

function elementRoll() {
	// Determines the element of the your attack & how much damage it adds
}

function criticalStrike(element, armorType) {
	// Calculates if your attack will critically strike & how much damage it will do based on 
	// the element of the attack and the armor type of the target 
}

function fatalBlow(previousHealth) {
	if (previousHealth === 1){
		let roll = Math.floor(Math.random() * 6) + 1;
		if (roll <= 4){
			return false;
		} else {
			return true;
		}
	}else{
		let roll = Math.floor(Math.random() * 6) + 1;
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

function computerMove() {
	// Determines whether the computer will heal or attack
}

function playerMove() {
	// Determines whether the player wishes to heal or attack
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

runTheGame();