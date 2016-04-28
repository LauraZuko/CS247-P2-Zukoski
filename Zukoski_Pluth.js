/* 	 Laura Zukoski 
	 Edward Pluth
	 Project 2 - Adventure Game
	 Web and Distributed Programming
	 Fall 2015
*/

// Call init function when the page loads
function init() {
	//these set our NSEW directions for the game's room array 
	NORTH = 0;
	SOUTH = 1;
	EAST = 2;
	WEST = 3;
	
	// The order gameRooms is in: [bar, office, hall, men's room, women's room, exit, lounge, alley]
	// [[N,S,E,W] The order we use for the directions you can go in the rooms]
	gameRooms = [[1,5,2,6], [-1,0,-1,-1], [3,-1,4,0], [-1,2,-1,-1], [-1,-1,-1,2], [0,-1,-1,-1], [-1,-1,0,7], [-1,-1,6,-1]];
	
	//an array of all the objects in the game
	//indexed with the rooms they are in
	gameItems = [["note"], ["ledger"], [], [], ["key"], [], ["handkerchief"], [], [], []];
	
	// initialize the beginning values
	playerScore = 0;
	currentRoom = 9;
	
	//this will be part of the welcome screen
	gameWelcome = ["Welcome to Private i! A game where you play a private investigator who finds himself in a dangerous situation.<br />"
	+ "While pursuing a lead on some know mob members, you stop by a shady bar to get some of the local word...<br />"
	+ "Things go horribly wrong when you wake up and the bar is in shambles, and the bartender is dead!<br />"
	+ "You now must explore the bar and its rooms for clues that might help clear your name! <br />"
	+ "Drop items ONE AT A TIME into the repository room to get points. <br />"
	+ "Enter the word \"START\" to being the game."];
	
	// These are our room descriptions
	roomDescriptions = ["You wake up in the bar groggy and sluggish. You realize your head is sticking to the bar top, and you are surrounded by blood.<br />" //bar
	+ "The bar is old and dimly lit. As you pick your head up you notice the body of the now dead bartender.<br />"
	+ "You can see rooms to the North, South, East, and West. <br />"
	+ "You see a note on the bar.",
	 "This is an old dusty office with old leather chairs. <br />" //office
	+ "It smells of tobacco. <br />"
	+ "You see a small ledger on the desk. <br />"
	+ "You can only go South from here.",
	 "You are in a hallway. <br />" //hallway
	+ "It is decorated with small glass mirrors. <br />"
	+ "From here you can go East, West, or North.",
	 "This is the men's bathroom. <br />" //men's room
	+ "It is a gross and dank room. But as all clues are found in the bathroom as you know the police always check the bathrooms. <br />"
	+ "You should collect your clues and bring them here. <br />"
	+ "You can only go South from here.", 
	 "This is the women's bathroom. You know bathrooms are the key to solving all murders.<br />" //women's bathroom
	+ "Not any less gross than the men's room. <br />"
	+ "You see a small key near a stall door. <br />"
	+ "From here you can go West.",
	 "You are at the exit. <br />" //the exit
	+ "You gaze down the cold streets and long for the warmth of indoors. <br />"
	+ "Across the street, a shady character lights his smoke.  He doesn't seem to notice you. <br />"
	+ "You can only go North from here.",
	 "This is the lounge. <br />" //the lounge
	+ "A once opulent and imperial room, now a husk of its former self."
	+ "You see signs of a struggle further into the room. <br />"
	+ "You can make out what seems to be a bloody handkerchief on a stool. It seems someone was trying to clean up some blood on their hands. <br />",
	 "This is the alleyway. <br />" //alley
	+ "Scratchy pitter-patter of rodents can be heard coming from piles of garbage. "
	+ "The dark alley stares back at you and you feel a chill...<br />"
	+ "You can only go East from here.",
	"You won the game! Congrats, now the police will be able to catch the real killer.",
	"Welcome to Private i! A game where you play a private investigator who finds himself in a dangerous situation.<br />"
	+ "While pursuing a lead on some know mob members, you stop by a shady bar to get some of the local word...<br />"
	+ "Things go horribly wrong when you wake up and the bar is in shambles, and the bartender is dead!<br />"
	+ "You now must explore the bar and its rooms for clues that might help clear your name! <br />"
	+ "Drop items ONE AT A TIME into the repository room to get points. <br />"
	+ "Enter the word \"START\" to being the game."];
	
	// These are the images we will be using for each room
	imageArray = ["bar2.jpg", 
				"office2.jpg", 
				"hallway.jpg", 
				"bathroom.png", 
				"bathroom.png", 
				"guitar_gangster_cover.png", 
				"lounge.jpg", 
				"alley.jpg",
				"Game-Over.jpg",
				"startscreen.jpg"]; 
				
	// Loads the image for the current Room
	var theImage = document.getElementById("theImage");
	theImage.src = imageArray[currentRoom];	
	
	// Displays the players score, the room descriptions and items for that room
	document.getElementById("playerScore").innerHTML = playerScore;
	document.getElementById("description").innerHTML = roomDescriptions[currentRoom];
	document.getElementById("roomitem").innerHTML = gameItems[currentRoom];
	
}

// function to transfer items between the room and player inventory
function transfer(){
	 playerInv = [];
	 var itemPickUp = document.getElementById("roomitem").value;
	 playerInv.push(itemPickUp);
	 document.getElementById("roomitem").innerHTML = gameItems[currentRoom] = [];
	 for (i=0; i<playerInv.length; i++) {
		 var newItem = playerInv[i];
	 }
	 document.getElementById("playeritem").innerHTML += newItem;
	 document.getElementById("inputField").value = "";
}

// function to drop an item, if score is max score then game over screen comes up and game ends
function dropItem() {
	 itemDrop = document.getElementById("playeritem").value;
	 drop = playerInv.indexOf(itemDrop);
	 if ((currentRoom == 3) && (drop == 0)) {
		document.getElementById("playerScore").innerHTML = playerScore += 1;
		document.getElementById("playeritem").innerHTML = gameItems[currentRoom] = [];
		playerInv.pop(drop);
		dropThis = userCommandSplit[1];
		alert("You dropped " + dropThis);
	 }
	 
	 // If the player gets the max score of 4, than they win
	 document.getElementById("inputField").value = "";
	 if (playerScore == 4) {
		 alert("congrats, you found all the clues! Now the police won't arrest you for murder, they will catch the true killer!");
		 var theImage = document.getElementById("theImage");
		 currentRoom=8;
		 theImage.src = imageArray[currentRoom];	
		 document.getElementById("description").innerHTML = roomDescriptions[currentRoom];
	 }
}

// we need to refresh the rooms, description, items, and image
// assess the room and refresh the image of the room and any items it has
// also where can you walk from this room 
function refreshRoom() {
	theImage = document.getElementById("theImage");
	theImage.src = imageArray[currentRoom];
	document.getElementById("inputField").value = "";
	document.getElementById("playerScore").innerHTML = playerScore;
	document.getElementById("description").innerHTML = roomDescriptions[currentRoom];
	document.getElementById("roomitem").innerHTML = gameItems[currentRoom];
}


function inputCheck(){			
	// gets input converts user input to upper case and parses input
	var userCommand = document.getElementById("inputField").value.toUpperCase();
	userCommandSplit = userCommand.split(" ");
	
	// If the user enters a move function (starts with GO)
	if (userCommand.search (/^GO/i) == 0)  {
			if (userCommandSplit[1] == "NORTH") {
				if (gameRooms[currentRoom][NORTH] != -1) {
					currentRoom = gameRooms[currentRoom][NORTH];
					refreshRoom();
				} else if (gameRooms[currentRoom][NORTH] == -1) {
					alert("You hit a wall. Maybe next time don't drink so much!");
				}
			} else if (userCommandSplit[1] == "SOUTH") {
				if (gameRooms[currentRoom][SOUTH] != -1) {
					currentRoom = gameRooms[currentRoom][SOUTH];
					refreshRoom();
				} else if (gameRooms[currentRoom][SOUTH] == -1) {
					alert("You hit a wall. Maybe next time don't drink so much!");
				}
			} else if (userCommandSplit[1] == "EAST") {
				if (gameRooms[currentRoom][EAST] != -1) {
					currentRoom = gameRooms[currentRoom][EAST];
					refreshRoom();
				} else if (gameRooms[currentRoom][EAST] == -1) {
					alert("You hit a wall. Maybe next time don't drink so much!");
				}
			} else if (userCommandSplit[1] == "WEST") {
				if (gameRooms[currentRoom][WEST] != -1) {
					currentRoom = gameRooms[currentRoom][WEST];
					refreshRoom();
				} else if (gameRooms[currentRoom][WEST] == -1) {
					alert("You hit a wall. Maybe next time don't drink so much!");
				}
			} 
	// If the user enters a command to take something from the room
	} else if (userCommand.search (/^TAKE/i) == 0) {
			if (userCommandSplit[1] == "KEY") {
				if ((currentRoom == 4)) {
					transfer();
					alert("You picked up a key!");
				} else {
					alert("What Key?");
				}
			} else if (userCommandSplit[1] == "HANDKERCHIEF") {
				if ((currentRoom == 6)) {
					transfer();
					alert("You picked up a Bloody Handkerchief!");
				} else {
					alert("What Handkerchief?");
				}
			} else if (userCommandSplit[1] == "LEDGER") {
				if ((currentRoom == 1)) {
					transfer();
					alert("You picked up a Ledger!");
				} else {
					alert("What Ledger?");
				}
			} else if (userCommandSplit[1] == "NOTE") {
					if ((currentRoom == 0)) {
					transfer();
					alert("You picked up a Note!");
				} else {
					alert("What Note?");
				}
			} 
	// If the user enters a command to drop something
	} else if (userCommand.search (/^DROP/i) == 0) {
			if (userCommandSplit[1] == "KEY") {
				dropItem();
			} else if (userCommandSplit[1] == "HANDKERCHIEF") {
				dropItem();
			} else if (userCommandSplit[1] == "LEDGER") {
				dropItem();
			} else if (userCommandSplit[1] == "NOTE") {
				dropItem();
			} else {
				alert("You do not have an item to drop");
			}
	} else if (userCommand.search (/^START/i) == 0) {
			currentRoom = 0;
			refreshRoom();

	// if not one of the above commands, the input isn't valid and alerts user to enter correct input
	} else {
		alert("Enter a valid command!");
	}
	
}

// checks when the user presses enter, and calls the input check function.
function newCommand() {
	// Get the code for the character that was pressed
	var x;
	if(window.event) // IE8 and earlier
	{
		x=event.keyCode;
	} 
	else if(event.which) // IE9/Firefox/Chrome/Opera/Safari
	{
		x=event.which;
	}
		// Check if "enter" was pressed
		if (x==13) {
			// Calls the inputCheck function
			inputCheck();
			
			// Stop event propagation
			if(!e) var e = window.event;
			e.cancelBubble = true;
			e.returnValue = false;
			if (e.stopPropagation) {
				e.stopPropagation();
				e.preventDefault();
			}
		}
	}
