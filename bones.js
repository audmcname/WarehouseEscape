//All the gritty functions that keep the program running are happening right here. Everything that stays the same from room to room.

//-----------------------------------The functions that change the page-----------------------------------
window.onload = function(){
	var text_input = document.getElementById("myText");
	// Makes it so that when you load the document, you don't have to delete the starter text.
	printStoryText("You are in a huge warehouse and you are alone.","p");
	text_input.select();
}

function printStoryText(textToShow, textStyle){
	var story = document.getElementById("storybox");
	var userText = document.createElement(textStyle);
	if(typeof textToShow === "object"){
		for(i = 0; i < textToShow.length; i++){
			printStoryText(textToShow[i], textStyle);
		}
	}else{
		userText.appendChild(document.createTextNode(textToShow));
		//userText.appendChild(document.createTextNode(typeof textToShow));
		story.appendChild(userText);
		story.appendChild(document.createElement("br"));
		return(userText);
	}
}

function textKeyPress(inputThing){
	//Makes the return key (13) do the input thing. inputThing = most recent user entered information.
	if (event.keyCode == 13){
		appendToBox(inputThing.value);
		// Clears the field after transferring the information
		doCommand(inputThing.value, arrayOfCommands, arrayOfCommandsKey);
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

function commandInArrayOfArrays(command, L){ 
	//Finds the outer index of a command in a array of arrays.
	var gotahit = false;
	for(i=0; i<L.length; i++){
		for(v=0; v<L[i].length; v++){
			if(command.search(L[i][v]) > -1){
				gotahit = true;
				break;
			}
		}
		if (gotahit == true){
			return i;
			break;
		}
	}
	if (gotahit == false){
		return -1;
	}
}

function doCommand(command, commandList, commandKey){
	//Uses the index of a command in an array of arrays and actualizes the command.
	var command = command.toLowerCase();
	var story = document.getElementById("storybox");
	//printStoryText("This part is working", "p"); //test
	turnCount += 1;
	var index = commandInArrayOfArrays(command, commandList);
	if (index > 0){
		commandKey[index](command);
	}else{
		emitRandomError();
	}story.scrollTop = story.scrollHeight;
}


//-----------------------------------------------------------------------------------------------------------

//If this didn't exist, you could play the game forever and ever and ever and we don't want that do we.
var turnCount = 0;
var inventory = [{"Name":"No tea", "Status":false}, {"Name":"Nothin\'", "Status":false}, {"Name":"Box", "Status":false, "Description":"An oily old box. There are faint markings on the sides, but they have been obscured", "Takeable":false, "TakeAction":"You take the box", "DiscardAction":"You discard the box"}];
//Syntax: [{"Name":"X", "Status":bol, "Description":"X", "Takeable":bol "TakeAction":"X", "DiscardAction"}]
//var wearing = [{"Name":"Pants"}, {"Name":"Shirt"}, {"Name":"Shoes"}];
var escape = false;
var jedRocks = 0;
//if this variable reaches...20? You die. A horrible sudden death. Like health.
var batteredness = 0;