function runTheGame() {
	let playerWin = 0;
	let computerWin = 0;
	do{
		let turn = 0;
		let playerHealth = 100;
		let computerHealth = getComputerHealth(getDifficulty());
		let playerArmor = getPlayerArmorType();
		let computerArmor = getComputerArmorType();
		alert("The computer has " + computerArmor + " armor.\n\n")
		displayHealth(playerHealth, computerHealth, turn);
		let gameIsStillGoing = true;
		while(gameIsStillGoing){
			let healthArray = [];
			turn++;
			if(whoIsFirst()){
				healthArray = playerFirst(playerHealth, computerHealth, playerArmor, computerArmor, turn);
			}else{
				healthArray = computerFirst(playerHealth, computerHealth, playerArmor, computerArmor, turn);
			}
			playerHealth = healthArray[0];
			computerHealth = healthArray[1];
			gameIsStillGoing = bothPlayerHealthCheck(playerHealth, computerHealth);	
		}
		if(displayWinner(playerHealth)){
			playerWin++;
		}else{
			computerWin++;
		}
		console.log("Player Wins: " + playerWin + "     Computer Wins:" + computerWin);
	} while(playAgain());
}

function whoIsFirst() {
	if(rollTheDice(2) === 1){
		return true;
	}else{
		return false;
	}
}

function bothPlayerHealthCheck(playerHealth, computerHealth) {
	return playerHealth > 0 && computerHealth > 0;
}

function playerTurn(playerHealth, computerHealth, computerArmor) {
	playerMove = getPlayerMove();
	if(playerMove){
		computerHealth = calculateHealth(computerHealth, playerAttack(computerArmor));
	}else{
		playerHealth = calculateHealth(playerHealth, playerHeal());
	}
	return [playerHealth, computerHealth];
}

function computerTurn(playerHealth, computerHealth, playerArmor) {
	computerMove = getComputerMove(computerHealth);
	if(computerMove === "attack"){
		playerHealth = calculateHealth(playerHealth, computerAttack(playerArmor));
	}else{
		computerHealth = calculateHealth(computerHealth, computerHeal());
	}
	return [playerHealth, computerHealth];
}

function playerFirst(playerHealth, computerHealth, playerArmor, computerArmor, turn) {
	let healthArray = [];
	alert("You go first this turn.\n\n");
	healthArray = playerTurn(playerHealth, computerHealth, computerArmor); 
	playerHealth = healthArray[0];
	computerHealth = healthArray[1];
	displayHealth(playerHealth, computerHealth, turn);

	if (computerHealth > 0) {
		healthArray = computerTurn(playerHealth, computerHealth, playerArmor);
		playerHealth = healthArray[0];
		computerHealth = healthArray[1];
		displayHealth(playerHealth, computerHealth, turn);
	}
	return [playerHealth, computerHealth];
}

function computerFirst(playerHealth, computerHealth, playerArmor, computerArmor, turn) {
	let healthArray = [];
	alert("The computer goes first this turn.\n\n");
	healthArray = computerTurn(playerHealth, computerHealth, playerArmor);
	playerHealth = healthArray[0];
	computerHealth = healthArray[1];
	displayHealth(playerHealth, computerHealth, turn);

	if(playerHealth > 0) {
		healthArray = playerTurn(playerHealth, computerHealth, computerArmor);
		playerHealth = healthArray[0];
		computerHealth = healthArray[1];
		displayHealth(playerHealth, computerHealth, turn);
	}
	return [playerHealth, computerHealth];
}

function playerAttack(computerArmor) {
	alert("You chose to attack.\n\n");
	let hitChance = getHitChance(playerMove);
	if(hitChance){
		let baseDamage = getBaseDamage(playerMove);
		console.log("Your base damage rolled to " + baseDamage + ".");
		let elementType = getElementType();
		let elementDamage = getElementDamage();
		console.log("Your element rolled to " + elementType + " and it does " + elementDamage + " bonus damage.");
		let defenseMultiplier = getDefenseMultiplier(computerArmor, elementType);
		let resistancePenetration = getResistancePenetration();
		console.log(computerArmor + " armor takes " + defenseMultiplier * 100 + "% damage from " + elementType + " attacks but your armor penetration rolled to " + resistancePenetration * 100 + "%.");
		let criticalStrikeMultiplier = getCriticalStrikeMultiplier(computerArmor, elementType);
		if(criticalStrikeMultiplier === 1){
			console.log("You did not crit this turn.");
		}else{
			console.log("You crit! Your multiplier is " + criticalStrikeMultiplier + "!")
		}
		let totalDamage = getTotalDamage(baseDamage, elementDamage, defenseMultiplier, resistancePenetration, criticalStrikeMultiplier);
		alert("Your total damage dealt is " + totalDamage + ".\n\n")
		return totalDamage;
	}else{
		alert("Your attack missed.\n\n");
		return 0;
	}
}

function playerHeal() {
	alert("You chose to heal.\n\n")
	let baseDamage = getBaseDamage(playerMove);
	let elementType = getElementType();
	let elementDamage = getElementDamage();
	if(elementType === "water"){
		alert("Your element rolled to water so your heal is extremely effective!!!\n\n");
	}
	let totalHealing = getTotalHealing(baseDamage, elementType, elementDamage);
	alert("You heal yourself for " + totalHealing + ".\n\n");
	return Math.sign(-1) * totalHealing;
}

function computerAttack(playerArmor) {
	alert("The computer chose to attack.\n\n");
	let hitChance = getHitChance(computerMove);
	if(hitChance){
		let baseDamage = getBaseDamage(computerMove);
		console.log("The computer's base damage rolled to " + baseDamage + ".");
		let elementType = getElementType();
		let elementDamage = getElementDamage();
		console.log("The computer's element rolled to " + elementType + " and it does " + elementDamage + " bonus damage.");
		let defenseMultiplier = getDefenseMultiplier(playerArmor, elementType);
		let resistancePenetration = getResistancePenetration();
		console.log(playerArmor + " armor takes " + defenseMultiplier * 100 + "% damage from " + elementType + " attacks but the computers armor penetration rolled to " + resistancePenetration * 100 + "%.");
		let criticalStrikeMultiplier = getCriticalStrikeMultiplier(playerArmor, elementType);
		if(criticalStrikeMultiplier === 1){
			console.log("The computer did not crit this turn.");
		}else{
			console.log("The computer crit! Its multiplier is " + criticalStrikeMultiplier + "!")
		}
		let totalDamage = getTotalDamage(baseDamage, elementDamage, defenseMultiplier, resistancePenetration, criticalStrikeMultiplier);
		alert("The total damage dealt is " + totalDamage + ".\n\n")
		return totalDamage;
	}else{
		alert("The computer's attack missed.\n\n");
		return 0;
	}
}

function computerHeal() {
	alert("The computer chose to heal.\n\n");
	let baseDamage = getBaseDamage(computerMove);
	let elementType = getElementType();
	let elementDamage = getElementDamage();
	if(elementType === "water"){
		console.log("The computer's element rolled to water so its heal is extremely effective!!!");
	}
	let totalHealing = getTotalHealing(baseDamage, elementType, elementDamage);
	alert("The computer heals itself for " + totalHealing + ".\n\n");
	return Math.sign(-1) * totalHealing;
}

function getDifficulty() {
	let invalidInput = true;
	let difficulty = confirm("Would you like to increase your difficulty?\n\nPress OK to increase your difficulty or CANCEL to continue.");
	return difficulty;
}

function getComputerHealth(difficulty) {
	if(!difficulty){
		return 100;
	} else {
		let roll = rollTheDice(20);
		let difficultyScaling = roll * 5;
		alert("Your difficulty was increased by " + difficultyScaling + "%.\n\n");
		return difficultyScaling + 100;
	}
}

function getHitChance(ability) {
	if (ability === "attack"){
		let roll = rollTheDice(4);
		if (roll === 1) {
			console.log("Hit chance rolled a " + roll + ". The attack misses.");
			return false;
		} else{
			console.log("Hit chance rolled a " + roll + ". The attack connects.");
			return true;
		}
	} else {
		return true;
	}
}

function getPlayerArmorType() {
	armorType = confirm("Do you prefer Plate or Leather armor? \n\nPress OK for Plate armor or CANCEL for Leather armor");
	if (armorType){
		return 'leather';
	}
	return 'plate';
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
	let roll = rollTheDice(18)
	if (move === "attack"){
		return roll;
	} else{
		return Math.ceil(roll / 2);
	}
}

function getTotalDamage(baseDamage, elementDamage, defenseMultiplier, resistancePenetration, criticalStrikeMultiplier) {
	let totalDamage = baseDamage + elementDamage;
	totalDamage *= criticalStrikeMultiplier;
	totalDamage *= defenseMultiplier + resistancePenetration;
	return Math.round(totalDamage);
}

function getTotalHealing(baseDamage, elementType, elementDamage) {
	let totalHealing = baseDamage;
	if(elementType === "water"){
		totalHealing *= elementDamage + 3;
		return totalHealing;
	}
	else{
		return totalHealing;
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
	return roll * .04
}

function getElementType() {
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
	let roll = rollTheDice(5);
	return roll;
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

function calculateHealth(health, damage) {
	let previousHealth = health;
	health -= damage;
	if (previousHealth === 1 && health < 1){
		let roll = rollTheDice(6);
		if (roll <= 4){
			return 0;
		} else {
			alert("Resisted Death.\n\n")
			return 1;
		}
	}else if(previousHealth > 1 && health <1){
		let roll = rollTheDice(6);
		if (roll <= 2){
			return 0;
		} else {
			alert("Resisted Death.\n\n")
			return 1;
		}
	}else{
		return health;
	}
}

function displayHealth(playerHealth, computerHealth, turn) {
	console.clear();
	console.log("Turn: " + turn);
	console.log(`You have ${playerHealth} health remaining.`);
	console.log(`Your opponent has ${computerHealth} health remaining.`);
}

function getComputerMove(computerHealth) {
	if (computerHealth <= 10){
		return "heal";
	} else {
		return "attack";
	}
}

function getPlayerMove() {
	move = confirm("Would you like to heal? \n\n Press OK to heal and CANCEL to attack.");
	return !(move);
}

function displayWinner(playerHealth) {
	if (playerHealth > 0){
		alert("Congradulations!!! Your honor & reputation remains intact!!!\n\n");
		return true;
	} else{
		alert("To your upmost disgrace you have been defeated!!!\n\n")
		return false;
	}
}

function playAgain() {
	return confirm("Press OK to play again.");
}

function rollTheDice(sidesOfDice) {
	return Math.floor(Math.random() * sidesOfDice) + 1;
}