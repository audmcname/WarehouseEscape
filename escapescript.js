document.write('<scr'+'ipt type="text/javascript" src="bones.js" ></scr'+'ipt>');


// --Okay, this is the parser. I need to make the lines do things in the code now! I have the privilage of figuring this out! I'll set some variables.
var warehouseRoom = "beginning"; //(I'll be getting rid of this eventually, but that'll take a tad bitt'a work.)
var heavyPulley = "up";
var boxes = "stacked";
var wallBatteredness = 0;
var arrayOfCommands = [["take", "get", "grab", "hold"],["discard","drop",],["use","combine"],["look","inspect"],["inventory","inven"],["north"],["south"],["east"],["west"],["yodel", "yodle"],["rock"]];
var arrayOfCommandsKey = [doTake, doDiscard, doUse, doLook, doInventory];//The north/south etc ain't in here yet, but besides that...
//I am SO CLOSE to making this happen but hard to figure out logistics of storing (call to) functions in arrays. Possibly helpful: x = [function(){alert('hi');}][0]()
//The eval(thing) function  will prob do what I need, however, people hate it. window[the thing] might also work but I'm fuzzy on it. So. I'll get to that later.
function processLine(inputThing){
	//This is soon to be outmodded.
	var command = inputThing.toLowerCase();
	var story = document.getElementById("storybox");
	//printStoryText("This part is working", "p"); //test
	turnCount += 1;

	if (turnCount == 25) {
		printStoryText("You realize that you don't have forever to complete this escape","p");
	};
	if (turnCount == 40) {
		printStoryText("Your time is running short","p");
	};
	if (turnCount > 50){ //Ends game if one has taken too long
		//todo make different losing sequences with different pages, gack
		//alert("you have lost the game");
		window.open("lose.html", '_self', false);
	}

	if (command.search("take") > -1){
		doTake(command);
		//make inventory work, taking things out and putting them in

	}else if (command.search("discard") > -1){
		doDiscard(command);
		//same here
	}else if (command.search("use") > -1){
		doUse(command);
	}else if (command.search("look") > -1){
		doLook(command);
	}else if (command.search("inventory") > -1){
		doInventory(story);
	}else if (command.search("north") >-1){
		//Got rid of beginning, middle and end. Now is single room, when escaped this one goes to another.
		if(boxes === "stacked"){
			printStoryText("You take a tentative step forwards. The shifting of your weight causes the teetering pile of boxes to tumble in slow motion towards you, end over end. They land with a hideous thud.", "p");
			boxes = "fallen";
			inventory[2].Takeable = true
		}else{
			printStoryText("You eye the fallen boxes with a particular trepidation. You decide you like your ankles in the condition that they're in.", "p");
		}

	}else if (command.search("south") > -1){
		if(heavyPulley === "up"){
			printStoryText("You step back to controls of the tall pulley and crunch a lever. The concrete barrel falls with a sickening thud onto the old tarp.", "p");
			heavyPulley = "down";

		}else{
			printStoryText("Back at the pulley controls, you slowly move the nuclear containment barrel back into position, high above the tarp.","p");
			heavyPulley = "up";
		}

	}else if (command.search("east") > -1){
		

	}else if (command.search("west") > -1){
		
	//The place to put the random things that are really annoying ways to die, etc....
	}else if(command.search("yodel") >-1){
		printStoryText("Your plaintive sounds echo across the metal barrel. It sounds like someone killing a cat. Well, if you really need help this bad... stop yodeling. Stop. Look, your ears are bleeding. Soft sticky ooze that rolls down the sides of your cheeks like tears, landing on the ground and soaking through, further and further, deep into the ground...","p");
		printStoryText("Okay. Just look down BELOW the ground, okay? Below them dusty boards.", "p");
		batteredIncrease();

	}else if(command.search("rock") > -1){
		
		var jedMessages = [["You walk to Jed. He raises his eyebrows. \"Have I got the music for you, man,\" he says. \"Have I got the music for you.\" He pulls one of his earbuds out, passes it towards you...", "Dazed, you wake from a musical stupor. Golly, you think. Perhaps I shouldn't do that again."], ["It's just so... smooth... like him, you think. Them tunes tho. You sit on the grungy ground and contemplate your shoes like you've never before.", "Your headache burns like the fires of..."], "The charisma...the beat. Who cares about escape when you have these soft soulful twangs, heavy breathing... ", "YOU NEED TO STOP", "The ground is your pillow, the dust if your food, the music is water, Jed is a god."]
		if (jedRocks == 5) {
			window.open("jedRocks.html", '_self', false);
		}else{
			printStoryText(jedMessages[jedRocks], "p");
			jedRocks = jedRocks + 1;
			batteredIncrease();
		}
		
		
	}else{emitRandomError();}
	story.scrollTop = story.scrollHeight;
}

function doUse(command){
	if (command.search("self") > -1){
		if (command.search("wall") > -1){
			var wallMessages = [["An idea dawns. You flex your arms, convincing yourself that you are possessed of a feline strength. You take a deep breath, and...run.", "Your head hurts, but the visceral pain subsides some when you see a hairline crack in the musty wood."], "Picking yourself back up, you tuck your arms into your armpits for a more areodynamic sprint. And to, you know, keep your survival instinct from trying to brace yourself against the rapidly approaching wall--", "You need to escape. You NEED TO ESCAPE, you remind yourself. That life outside is the one that matters, none of these boxes and irradiated barrels and alarming pactches of tar...", ["You tried to hold that in your mind. Your ragged breathing sound somehow pulpy to your ears. You grasp your stomach and swing yourself feebly at the wall once again.", "You notice, with your dim peripheral vision, that the wall has almost given."], "Too exhausted to run, you claw at the crumbling boards. So close..."];
				if (wallBatteredness == 5){ 
					window.open("wallescape.html", '_self', false);
				}else{
					printStoryText(wallMessages[wallBatteredness], "p");
					wallBatteredness += 1;
					batteredIncrease();
				}
		}else{
			printStoryText("Cries");
		}
	}else{
		printStoryText("Cries");
	}
	//figure out how to put thing into inventory	
}

function doLook(command){ //this is a terrible way to do this. Make a better one.
	if (command.search("boxes") > -1){
		if(boxes === "stacked"){
			printStoryText("In front of you, there are stacks of boxes piled dangerously high. Motes of dust float gently down onto them.", "p");
		}else{
			printStoryText("A half-fallen stack of boxes lies at your feet. The closest one is covered in dark oily slick. You hesitate to move forwards.", "p");
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

	}else{
		printStoryText("Not focusing on anything in particular, you take in the room.", "p");
	}
}

function doTake(command){
	for(i=0; i<inventory.length; i++){
		if (command.search(inventory[i].Name.toLowerCase()) > -1){
			if (inventory[i].Takeable == true){
				inventory[i].Status = true;
				printStoryText(inventory[i].TakeAction, "p");
			}
		}
	}
}

function doDiscard(command){
	for(i=0; i<inventory.length; i++){
		if (command.search(inventory[i].Name.toLowerCase()) > -1){
			if(inventory[i].Status == true){
				inventory[i].Status = false;
				printStoryText(inventory[i].DiscardAction, "p");
			}
		}
	}

}

function doInventory(story){
	var printed = 0;
	story.appendChild(document.createTextNode("You have:"));
	story.appendChild(document.createElement("br"));
	var iList = document.createElement("ul");
	for(var i = 0; i<inventory.length; i++){
		if (inventory[i].Status == true){ //Finds and prints items in inventory
			printed += 1;
			var item = document.createElement("li");
			item.appendChild(document.createTextNode(inventory[i].Name));
			iList.appendChild(item);
		}
	}
	if (printed == 0){ //Case: Nothing in inventory
		var item = document.createElement("li");
		item.appendChild(document.createTextNode("Absolutely nothing in your inventory"));
		iList.appendChild(item);
	}
	story.appendChild(iList);
}

function emitRandomError(){
	var errorMessages = ["You cough in the dust.", 
		"Your old army surplus backpack breaks a strap. Your entire inventory scatters over the rutted floor. The next five minutes are spent on a tedious clean up.", 
		"You wonder for a moment what everyone else in your life is doing. Someone's probably making toast. What kind of toast is it? Will they burn it? You sincerely hope not. You're kind of hungry.", 
		"As you idly swing your arms, your thumb brushes up against some rotting wood. You pretend that you don't care about splinters.", 
		"You just stand there, blank faced, like a fool. Foooooool you think you hear the wind say.", 
		"You decide you want to look at the grime. It's nice grime, you think. Really spectacular.", 
		"You wonder why you can't just beat at the wall until it breaks. It's pretty flimsy, you think. I could probably do this really easy. Just use self on wall. But...nah. It would never work.", 
		"You have the sudden urge to yodel for help", 
		"You feel a strange heat creep up your fingers. Probably just a placebo, trick of the mind, you think.", 
		"Why am I in here, you wonder. Why did I have the stupid idea to just walk into a obviously marked radiation storage building, all alone-- \"Hey man!\" says your friend Jed who's been sitting in the corner quietly all along. \"Wanna rock out to some tunes?\"",
		"You find a rock. It's a very nice rock. You throw it away.",
		"You feel a little nostalgia for the time, so long ago, when you weren't in this warehouse.", 
		"You can try.",
		"Good luck with that one.",
		"A sudden burst of insight: maybe you don't need to escape after all. Maybe that's not the point."
		];
	var randomError = Math.floor(Math.random() * errorMessages.length);
	//howto delay a function: window.setTimeout("javascript function", milliseconds);]
	printStoryText(errorMessages[randomError], "p");
}

function batteredIncrease(){
	batteredness = batteredness + 1;
	if (batteredness % 5 == 0){
		var batteredquan = batteredness / 5;
		console.log(batteredquan);
		var paineffects = ["Placeholder", "You feel a bruise blooming on your arm.", "You feel exhausted and weak.", "Your body is fragile. \"Hey man,\" your elbow says, \"I'm feeling pretty sick right now so if you could just leave off.\""];
		if (batteredquan == 0){
			return;
		}
		else if(batteredquan != 4){
			printStoryText(paineffects[batteredquan], "p");
		}else if(batteredquan == 4){
			printStoryText("This works", "p");
			window.open("battereddeath.html", '_self', false);
		}
	}
}

/*function getInventoryIndex(command){
	"Finds a) if the item is in the inventory in the first place and b) its index 
	"
	for(i=0; i<inventory.length; i++){
		if (command.search(inventory[i].Name) > -1){
			return 
		}
	}
}*/

