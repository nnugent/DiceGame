function runTheGame() {
	// runs the actual game
	do{
		let turn = 0;
		let playerHealth = 100;
		let computerHealth = getComputerHealth(getDifficulty());
		let playerArmor = getPlayerArmorType();
		let computerArmor = getComputerArmorType();

		while(playerHealth > 0 && computerHealth > 0){
			turn++;
			alert("Turn: " + turn);
			let whoIsFirst = rollTheDice(2);
			if(whoIsFirst === 1){
				alert("You go first this turn.");
				playerMove = getPlayerMove();
				if(playerMove === "attack"){				}
					computerHealth -= playerTurn(computerArmor, playerMove);
				}else{
					playerHealth += playerTurn(computerArmor, playerMove);
				}
				computerMove = getComputerMove();
				if(computerMove === "attack"){
					playerHealth -= computerTurn(playerArmor, computerMove);
				}else{
					computerHealth += computerTurn(playerArmor, computerMove);
				}
			}else{
				alert("The computer goes first this turn.");
				computerMove = getComputerMove();
				if(computerMove === "attack"){
					playerHealth -= computerTurn(playerArmor, computerMove);
				}else{
					computerHealth += computerTurn(playerArmor, computerMove);
				}
				playerMove = getPlayerMove();
				if(playerMove === "attack"){				}
					computerHealth -= playerTurn(computerArmor, playerMove);
				}else{
					playerHealth += playerTurn(computerArmor, playerMove);
				}
			}
		}
		displayWinner(playerHealth);

	} while(playAgain());
}

function playerTurn(computerArmor, playerMove) {
	// contains all steps of the players turn
	alert("You chose to " + playerMove + " .");
	if(playerMove === "attack"){
		let hitChance = getHitChance(playerMove);
		if(hitChance){
			let baseDamage = getBaseDamage(playerMove);
			alert("Your base damage rolled to " + baseDamage + ".");
			let elementType = getElementType();
			let elementDamage = getElementDamage();
			alert("Your element rolled to " + elementType + " and it does " + elementDamage + " bonus damage.");
			let defenseMultiplier = getDefenseMultiplier(computerArmor, elementType);
			let resistancePenetration = getResistancePenetration();
			alert("Your enemy has an inate " + defenseMultiplier * 100 + "% resistance to your attacks and your armor resistance penetration rolled to " + resistancePenetration * 100 + "%.");
			let criticalStrikeMultiplier = getCriticalStrikeMultiplier(computerArmor, elementType);
			if(criticalStrikeMultiplier === 1){
				alert("You did not crit this turn.");
			}else{
				alert("You crit! Your multiplier is " + criticalStrikeMultiplier + "!")
			}
			let totalDamage = getTotalDamage(baseDamage, elementDamage, defenseMultiplier, resistancePenetration, criticalStrikeMultiplier);
			alert("Your total damage dealt is " + totalDamage + ".")
			return totalDamage;
		}else{
			alert("Your attack missed.");
			return 0;
		}
	}else {
		let baseDamage = getBaseDamage(playerMove);
		let elementType = getElementType();
		let elementDamage = getElementDamage();
		if(elementType === "water"){
			alert("Your element rolled to water so your heal is extremely effective!!!");
		}
		let totalHealing = getTotalHealing(baseDamage, elementType, elementDamage);
		alert("You heal yourself for " + totalHealing + ".");
		return totalHealing;
	}
}

function compterTurn(playerArmor, computerMove) {
	alert("The computer chose to " + computerMove + " .");
	if(computerMove === "attack"){
		let hitChance = getHitChance(computerMove);
		if(hitChance){
			let baseDamage = getBaseDamage(computerMove);
			alert("The computer's base damage rolled to " + baseDamage + ".");
			let elementType = getElementType();
			let elementDamage = getElementDamage();
			alert("The computer's element rolled to " + elementType + " and it does " + elementDamage + " bonus damage.");
			let defenseMultiplier = getDefenseMultiplier(computerArmor, elementType);
			let resistancePenetration = getResistancePenetration();
			alert("You enemy has an inate " + defenseMultiplier * 100 + "% resistance to the computer's attacks and the computer's armor penetration rolled to " + resistancePenetration * 100 + "%.");
			let criticalStrikeMultiplier = getCriticalStrikeMultiplier(computerArmor, elementType);
			if(criticalStrikeMultiplier === 1){
				alert("The computer did not crit this turn.");
			}else{
				alert("The computer crit! Its multiplier is " + criticalStrikeMultiplier + "!")
			}
			let totalDamage = getTotalDamage(baseDamage, elementDamage, defenseMultiplier, resistancePenetration, criticalStrikeMultiplier);
			alert("The total damage dealt is " + totalDamage + ".")
			return totalDamage;
		}else{
			alert("The computer's attack missed.");
			return 0;
		}
	}else {
		let baseDamage = getBaseDamage(computerMove);
		let elementType = getElementType();
		let elementDamage = getElementDamage();
		if(elementType === "water"){
			alert("The computer's element rolled to water so its heal is extremely effective!!!");
		}
		let totalHealing = getTotalHealing(baseDamage, elementType, elementDamage);
		alert("The computer heals itself for " + totalHealing + ".");
		return totalHealing;
	}
}

function getDifficulty() {
	let invalidInput = true;
	let difficulty;
	while(invalidInput){
		difficulty = prompt("Would you like to play on normal or a randomly generated difficulty? (normal/random)").toLowerCase();
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
	if(difficutly === "normal"){
		return 100;
	} else {
		let roll = rollTheDice(20);
		let difficultyScaling = roll * 5;
		alert("Your difficulty was increased by " + difficultyScaling + "%.");
		return difficultyScaling;
	}
}
function getHitChance(ability) {
	if (ability === "attack"){
		let roll = rollTheDice(4);
		if (roll === 1) {
			console.log("Your hit chance rolled a " + roll + ". Your attack misses.");
			return false;
		} else{
			console.log("Your hit chance rolled a " + roll + ". Your attack connects.");
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
		totalHealing *= elementDamage;
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
	if(roll > 4){
		return (roll - 4) * .04;
	} else{
		return roll * .02;
	}
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
   