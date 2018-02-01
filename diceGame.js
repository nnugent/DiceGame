function runTheGame() {
	// runs the actual game
	do{
		let turn = 0;
		let playerHealth = 100;
		let computerHealth = getComputerHealth(getDifficulty());
		let playerArmor = getPlayerArmorType();
		let computerArmor = getComputerArmorType();
		alert("The computer has " + computerArmor + " armor.")
		displayHealth(playerHealth, computerHealth);

		while(playerHealth > 0 && computerHealth > 0){
			turn++;
			alert("Turn: " + turn);
			console.log("Turn: " + turn);
			let whoIsFirst = rollTheDice(2);
			if(whoIsFirst === 1){
				alert("You go first this turn.");
				playerMove = getPlayerMove();
				if(playerMove === "attack"){
					computerHealth = calculateHealth(computerHealth, playerAttack(computerArmor));
				}else{
					playerHealth = calculateHealth(playerHealth, playerHeal());
				}
				if(playerHealth === 0 || computerHealth === 0){
					break;
				}
				console.clear();
				console.log("Turn: " + turn);
				displayHealth(playerHealth, computerHealth);
				computerMove = getComputerMove(computerHealth);
				if(computerMove === "attack"){
					playerHealth = calculateHealth(playerHealth, computerAttack(playerArmor));
				}else{
					computerHealth = calculateHealth(computerHealth, computerHeal());
				}
				if(playerHealth === 0 || computerHealth === 0){
					break;
				}
				console.clear();
				console.log("Turn: " + turn);
				displayHealth(playerHealth, computerHealth);
			}else{
				alert("The computer goes first this turn.");
				computerMove = getComputerMove(computerHealth);
				if(computerMove === "attack"){
					playerHealth = calculateHealth(playerHealth, computerAttack(playerArmor));
				}else{
					computerHealth = calculateHealth(computerHealth, computerHeal());
				}
				if(playerHealth === 0 || computerHealth === 0){
					break;
				}
				console.clear();
				console.log("Turn: " + turn);
				displayHealth(playerHealth, computerHealth);
				playerMove = getPlayerMove();
				if(playerMove === "attack"){
					computerHealth = calculateHealth(computerHealth, playerAttack(computerArmor));
				}else{
					playerHealth = calculateHealth(playerHealth, playerHeal());
				}
				if(playerHealth === 0 || computerHealth === 0){
					break;
				}
				console.clear();
				console.log("Turn: " + turn);
				displayHealth(playerHealth, computerHealth);
			}
		}
		displayWinner(playerHealth);

	} while(playAgain());
}

function playerAttack(computerArmor) {
	// contains all steps of the players turn
	alert("You chose to attack.");
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
		alert("Your total damage dealt is " + totalDamage + ".")
		return totalDamage;
	}else{
		alert("Your attack missed.");
		return 0;
	}
}

function playerHeal() {
	alert("You chose to heal.")
	let baseDamage = getBaseDamage(playerMove);
	let elementType = getElementType();
	let elementDamage = getElementDamage();
	if(elementType === "water"){
		alert("Your element rolled to water so your heal is extremely effective!!!");
	}
	let totalHealing = getTotalHealing(baseDamage, elementType, elementDamage);
	alert("You heal yourself for " + totalHealing + ".");
	return Math.sign(-1) * totalHealing;
}

function computerAttack(playerArmor) {
	alert("The computer chose to attack.");
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
		alert("The total damage dealt is " + totalDamage + ".")
		return totalDamage;
	}else{
		alert("The computer's attack missed.");
		return 0;
	}
}

function computerHeal() {
	alert("The computer chose to heal.");
	let baseDamage = getBaseDamage(computerMove);
	let elementType = getElementType();
	let elementDamage = getElementDamage();
	if(elementType === "water"){
		console.log("The computer's element rolled to water so its heal is extremely effective!!!");
	}
	let totalHealing = getTotalHealing(baseDamage, elementType, elementDamage);
	alert("The computer heals itself for " + totalHealing + ".");
	return Math.sign(-1) * totalHealing;
}

function getDifficulty() {
	let invalidInput = true;
	let difficulty;
	while(invalidInput){
		difficulty = prompt("Would you like to play on normal or increase the difficulty by a random amount? (normal/random)").toLowerCase();
		try{
			if (difficulty === "") throw "No input detected, please answer either normal or random.";
			if (!(difficulty === "normal") && !(difficulty === "random")){
				throw "Invalid input, please answer normal or random.";
			}
			invalidInput = false;
		}catch(err){
			alert(err);
		}
	}
	return difficulty;
}

function getComputerHealth(difficulty) {
	if(difficulty === "normal"){
		return 100;
	} else {
		let roll = rollTheDice(20);
		let difficultyScaling = roll * 5;
		alert("Your difficulty was increased by " + difficultyScaling + "%.");
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
			alert("Resisted Death.")
			return 1;
		}
	}else if(previousHealth > 1 && health <1){
		let roll = rollTheDice(6);
		if (roll <= 2){
			return 0;
		} else {
			alert("Resisted Death.")
			return 1;
		}
	}else{
		return health;
	}
}

function displayHealth(playerHealth, computerHealth) {
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
	let invalidInput = true;
	let move;
	while(invalidInput){
		move = prompt("Would you like to heal or attack?").toLowerCase();
		try{
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
   