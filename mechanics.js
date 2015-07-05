//VARIABLES GO-----------

//If this didn't exist, you could play the game forever and ever and ever and we don't want that do we.
var turnCount = 0;
var inventory = [
	{Name:"no tea",
	Description:"BlahblahDouglasAdams"},
	{Name:"testing",
	Description:"rlkher"}
	];
var roomInventory = [
];
var warehouseRoom = "beginning";
var escape = false;
var heavyPulley = "up";
//Gonna try objects
var boxes = "stacked";
var	plasticBox = "hidden"; //cycles through hidden, unbroken and broken
var jedRocks = 0;
var wallStrength = 0;
var batteredness = 0; //if this variable reaches...20? You die. A horrible sudden death.

//FUNCTIONS NOW-------------

window.onload = function(){
	var text_input = document.getElementById("myText");
	// Makes it so that when you load the document, you don't have to delete the starter text.
	printStoryText("You are in a huge warehouse and you are alone.","p");
	text_input.select();
};

function printStoryText(textToShow, textStyle){
	var story = document.getElementById("storybox");
	var userText = document.createElement(textStyle);
	userText.appendChild(document.createTextNode(textToShow));
	story.appendChild(userText);
	story.appendChild(document.createElement("br"));
	return(userText);
}

function checkInventory(items, headingString){
	var story = document.getElementById("storybox");
	var userText = document.createElement("p");
	userText.appendChild(document.createTextNode(headingString));
	var userList = document.createElement("ul");
	userText.appendChild(userList);
	for(var i = 0; i<items.length; i++){
		var item = document.createElement("li");
		item.appendChild(document.createTextNode(items[i].Name));
		userList.appendChild(item);
	}
	story.appendChild(userText);
	// story.appendChild(document.createElement("br"));
	return(userList);
}


function textKeyPress(inputThing){
	//Makes the return key (13) do the input thing. inputThing = most recent user entered information.
	if (event.keyCode == 13){
		appendToBox(inputThing.value);
		// Clears the field after transferring the information
		processLine(inputThing.value);
		inputThing.value = "";
	}
}

function appendToBox(inputThing){
	var story = document.getElementById("storybox");
	var userText = document.createElement("i");
	userText.appendChild(document.createTextNode(inputThing));
	story.appendChild(userText);
	story.appendChild(document.createElement("br"));
	story.appendChild(document.createElement("br"));
}

function isThatInMyPockets(command, inventory){
	for(var i = 0; i < inventory.length; i++){
		var temp = inventory[i];
		if(command.search(temp.Name) > -1){
			return i;
		}
	}
	return -1;
}

// --Okay, this is the parser------------

function processLine(inputThing){
	var command = inputThing;
	var story = document.getElementById("storybox");

	turnCount = turnCount + 1;

	if(turnCount > 50){
		//todo make different losing sequences with different pages, gack
		alert("you have lost the game");
		window.open("lose.html", '_self', false);
	}

	if (command.search("take") > -1){
		takeTheThing(command);

	}else if (command.search("discard") > -1){
		dropTheThing(command);

	}else if (command.search("use") > -1){
		useTheThing(command);

	}else if (command.search("look") > -1){
		lookTheThing(command);

	}else if (command.search("inventory") > -1){
		checkInventory(inventory,"You have:");

	}else if (command.search("north") >-1){
		if(warehouseRoom === "beginning"){
			if(boxes == "stacked"){
				printStoryText("You take a tentetive step forwards. The shifting of your weight causes the teetering pile of boxes to tumble in slow motion towards you, end over end. They land with a hideous thud.", "p");
				boxes = "fallen";
				plasticBox = "unbroken";
			}else{
				printStoryText("You eye the fallen boxes with a particular trepidation. You decide you like your ankles in the condition that they're in.", "p");
			}

		}else if (warehouseRoom=== "middle"){

		}else if (warehouseRoom === "end"){

		}else{
			alert("Well, you must have escaped somehow. Or you died.");
			window.open("lose.html", '_self', false);
		}


	}else if (command.search("south") > -1){
		if(warehouseRoom === "beginning"){
			if(heavyPulley === "up"){
				printStoryText("You step back to controls of the tall pulley and crunch a lever. The concrete barrel falls with a sickening thud onto the old tarp.", "p");
				heavyPulley = "down";

			}else{
				printStoryText("Back at the pulley controls, you slowly move the nuclear containment barrel back into position, high above the tarp.","p");
				heavyPulley = "up";
			}

		}else if (warehouseRoom=== "middle"){

		}else if (warehouseRoom === "end"){

		}else{
			alert("Are you...hacking? Are you trying to tear apart my beautiful, simple game? Die.");
			window.open("lose.html", '_self', false);
		}

	}else if (command.search("east") > -1){
		if(warehouseRoom === "beginning"){

		}else if (warehouseRoom=== "middle"){

		}else if (warehouseRoom === "end"){

		}else{
			alert("Not to say that hacking is bad, it's just that right here I don't really NEed anyone poking around in my scripts. Execute.");
			window.open("lose.html", '_self', false);
		}

	}else if (command.search("west") > -1){
		if(warehouseRoom === "beginning"){

		}else if (warehouseRoom=== "middle"){

		}else if (warehouseRoom === "end"){

		}else{
			alert("You suck darlin. See you on the flipside.");
			window.open("lose.html", '_self', false);
		}
	//The place to put the random things that are really annoying ways to die, etc....
	}else if(command.search("yodel") >-1){
		printStoryText("Your plaintive sounds echo across the metal barrel. It sounds like someone killing a cat. Well, if you really need help this bad... stop yodeling. Stop. Look, your ears are bleeding. Soft sticky ooze that rolls down the sides of your cheeks like tears, landing on the ground and soaking through, further and further, deep into the ground...","p");
		printStoryText("Okay. Just look down BELOW the ground, okay? Below them dusty boards.", "p");
		batteredness = batteredness + 1;

	}else if(command.search("rock") > -1){
		rockOutWithJed();
	}else{
		throwRandomError();
	}
	if(batteredness === 3){
		printStoryText("You stare for a moment at a blooming bruise on your hand. It's the color of spilled wine of weak vintage.","p");

	}else if(batteredness === 5){
		printStoryText("That's some headache, you think. Or you would, if your headache wasn't so bad.","p");

	}else if(batteredness === 10){
		printStoryText("You reach up to touch your nose. It wiggles away from your fingers like a small furry animal.","p");

	}else if(batteredness === 15){
		printStoryText("You're feeling woozy.","p");

	}else if(batteredness === 18){
		printStoryText("Your periphery is blackening like a marshmallow you let stray too close to open flames. Use the coals, your friend said. You nodded, but as soon as they turned their back you popped it into your mouth. Who's your friend to tell you how to eat your marshmallows?","p");

	}else if(batteredness === 19){
		printStoryText("You're shaking, all over. Your skin has lost its original tint for one quite similar but a little more blue","p");

	}else if(batteredness === 20){
		window.open("battereddeath.html", '_self', false);
	}else{}
	story.scrollTop = story.scrollHeight;
}

function takeTheThing(command){
	if (command.search("box")> -1){
		if (boxes === "stacked"){
			printStoryText("What box? There are way too many boxes to see");
		}else{
			if(plasticBox === "unbroken"){
				printStoryText("As you reach for the box, the hinges snap off. \"I didn't touch it,\" you whisper, on reflex","p");
				printStoryText("You see a metal rod inside","p");
				roomInventory.push({Name:"rod", Description:"A warm metal rod that sends a shiver through your arm when you touch it. Or maybe that's your imagination."});
				plasticBox = "broken";
			}else{
				printStoryText("The greasy box looks too distasteful to want to put inside your faintly permissable backpack.", "p");
			}
		}
	}else{
		var index = isThatInMyPockets(command,roomInventory);
		if(index > -1){
			var item = roomInventory[index];
			roomInventory.splice(index, 1);
			inventory.push(item);
			printStoryText("You take the " + item.Name + ".", "p");
		}else{
			printStoryText("You don't see that item here.", "p");
		}

	}
}

function useTheThing(command){
	if (command.search("self") > -1){
		if (command.search("wall") > -1){
			if (wallStrength === 0){
				printStoryText("An idea dawns. You flex your arms, convincing yourself that you are possessed of a feline strength. You take a deep breath, and...run.", "p");
				printStoryText("Your head hurts, but the visceral pain subsides some when you see a hairline crack in the musty wood.","p");
				batteredness = batteredness + 1;
				wallStrength = wallStrength +1;
			}else if(wallStrength === 1){
				printStoryText("Picking yourself back up, you tuck your arms into your armpits for a more areodynamic sprint. And to, you know, keep your survival instinct from trying to brace yourself against the rapidly approaching wall--", "p");
				printStoryText("You try to pick yourself up, but it feels as though your right wrist may be broken.","p");
				batteredness = batteredness + 1;
				wallStrength = wallStrength + 1;
			}else if(wallStrength === 2){
				printStoryText("You need to escape. You NEED TO ESCAPE, you remind yourself. That life outside is the one that matters, none of these boxes and irradiated barrels and alarming pactches of tar...","p");
				batteredness = batteredness + 1;
				wallStrength = wallStrength +1;
			}else if(wallStrength === 3){
				printStoryText("You tried to hold that in your mind. Your ragged breathing sound somehow pulpy to your ears. You grasp your stomach and swing yourself feebly at the wall once again.","p");
				printStoryText("You notice, with your dim peripheral vision, that the wall has almost given.","p");
				batteredness = batteredness + 1;
				wallStrength = wallStrength +1;
			}else if(wallStrength === 4){
				printStoryText("Too exhausted to run, you claw at the crumbling boards. So close...","p");
				batteredness = batteredness + 1;
				wallStrength = wallStrength +1;
			}else{
				window.open("wallescape.html", '_self', false);

			}
		}else{
			throwRandomError();
		}
	}else{}
	//figure out how to put thing into inventory

}

function lookTheThing(command){
	if (warehouseRoom === "beginning"){
		if (command.search("boxes") > -1){
			if(boxes === "stacked"){
				printStoryText("In front of you, there are stacks of boxes piled dangerously high. Motes of dust float gently down onto them.", "p");
			}else{
				printStoryText("A half-fallen stack of boxes lies at your feet. The closest one is covered in dark oily slick. You hesitate to move forwards.", "p");
			}
		}else if(command.search("box") > -1){
			if(boxes === "stacked"){
				printStoryText("There are too many boxes to focus on any one. You notice that while some are made of simple wood, others are tight sealed plastic covered in some kind of residue.","p");
			}else{
				printStoryText("The oily box sitting practically on your toes looks slightly cracked around the hinges.","p");
			}
		}else if (command.search("crates") > -1){
			printStoryText("There are no crates in this room. There are old melted plastic boxes. You see no crates. Did someone tell you tell you there were crates? Who was it. Who would spread such slander?", "p");
		}else if (command.search("pulley") > -1){

		}else if (command.search("boards") > -1){

		}else if (command.search("tarp") > -1){

		}else if (command.search("nuclear") > -1){

		}else if(command.search("Jed") > -1){
			//add a randomized thing that says what jed is doing.
			printStoryText("Jed's just a really cool guy, y'know? You don't really want to bother Jed do you? He's just sitting around, fiddling with his headphones, but he's doing it amazingly and you probably shouldn't stop him.", "p");

		}else if (isThatInMyPockets(command,inventory) > -1){
			var index = isThatInMyPockets(command,inventory);
			var item = inventory[index];
			printStoryText(item.Description,"p");

		}else{
			printStoryText("Not focusing on anything in particular, you take in the room. In front of you, there's a large number of boxes. To the left there's a concrete barrel held aloft by an untrustworthy looking crane and pulley system, whos controls are located right behind you, to the south. To your right there's merely a large expanse of dusty wooden planks.", "p");
		}

	}else if (warehouseRoom === "middle"){

	}else if (warehouseRoom === "end"){

	}else{
		alert("holy crap you've broken the game. Dead now.");
		window.open("lose.html", '_self', false);
	}
}

function dropTheThing(command){
	var index = isThatInMyPockets(command,inventory);
	if(index > -1){
		var item = inventory[index];
		inventory.splice(index, 1);
		roomInventory.push(item);
		printStoryText("You drop the " + item.Name + " to the floor.", "p");
	}else{
		printStoryText("meh bro", "p");
	}
}

function rockOutWithJed(){
	jedRocks = jedRocks + 1;
	if(jedRocks === 1){
		printStoryText("You walk to Jed. He raises his eyebrows. \"Have I got the music for you, man,\" he says. \"Have I got the music for you.\" He pulls one of his earbuds out, passes it towards you...","p");
		printStoryText("Dazed, you wake from a musical stupor. Golly, you think. Perhaps I shouldn't do that again.","p");
		batteredness = batteredness + 1;
	}else if(jedRocks === 2){
		printStoryText("It's just so... smooth... like him, you think. Them tunes tho. You sit on the grungy ground and contemplate your shoes like you've never before.","p");
		printStoryText("Your headache burns like the fires of...","p");
		batteredness = batteredness + 1;
	}else if(jedRocks === 3){
		printStoryText("The charisma...the beat. Who cares about escape when you have these soft soulful twangs, heavy breathing... ","p");
		batteredness = batteredness + 1;
	}else if(jedRocks === 4){
		printStoryText("YOU NEED TO STOP","p");
		batteredness = batteredness + 1;
	}else if(jedRocks === 5){
		printStoryText("The ground is your pillow, the dust if your food, the music is water, Jed is a god.", "p");
		batteredness = batteredness + 1;
	}else{
		window.open("jedRocks.html", '_self', false);
	}
}

function throwRandomError(){
	var randomError = Math.floor((Math.random() * 10) + 1);
	if(randomError === 1){
		printStoryText("You cough in the dust.", "p");
	}else if(randomError === 2){
		printStoryText("Your old army surplus backpack breaks a strap. Your entire inventory scatters over the rutted floor. The next five minutes are spent on a tedious clean up.", "p");
	}else if(randomError === 3){
		printStoryText("You wonder for a moment what everyone else in your life is doing. Someone's probably making toast. What kind of toast is it? Will they burn it? You sincerely hope not. You're kind of hungry.","p");
	}else if(randomError === 4){
		printStoryText("As you idly swing your arms, your thumb brushes up against some rotting wood. You pretend that you don't care about splinters.","p");
	}else if(randomError === 5){
		printStoryText("You just stand there, blank faced, like a fool. Foooooool you think you hear the wind say.","p");
	}else if(randomError === 6){
		printStoryText("You decide you want to look at the grime. It's nice grime, you think. Really spectacular.","p");
	}else if(randomError === 7){
		printStoryText("You wonder why you can't just beat at the wall until it breaks. It's pretty flimsy, you think. I could probably do this really easy. Just use self on wall. But...nah. It would never work.", "p");
	}else if(randomError === 8){
		printStoryText("You have the sudden urge to yodel for help", "p");
	}else if(randomError === 9){
		printStoryText("You feel a strange heat creep up your fingers. Probably just a placebo, trick of the mind, you think.","p");
	}else if(randomError === 10){
		printStoryText("Why am I in here, you wonder. Why did I have the stupid idea to just walk into a obviously marked radiation storage building, all alone-- \"Hey man!\" says your friend Jed who's been sitting in the corner quietly all along. \"Wanna rock out to some tunes?\"", "p");
	}else{
		printStoryText("Ded.", "p");
		//howto delay a function: window.setTimeout("javascript function", milliseconds);
	}
}
