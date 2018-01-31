function runTheGame() {
	// runs the actual game
	determineHit("attack");
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
	//Displays the health of both the computer and the player at the end of the turn
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
	// Determines if the player would like to play again
}


runTheGame();