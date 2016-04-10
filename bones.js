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
	userText.appendChild(document.createTextNode(textToShow));
	story.appendChild(userText);
	story.appendChild(document.createElement("br"));
	return(userText);
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
//-----------------------------------------------------------------------------------------------------------

var player = {
	//If this didn't exist, you could play the game forever and ever and ever and we don't want that do we.
	var turnCount = 0;
	var inventory = [{"Name":"No tea"}];
	var wearing = [{"Name":"Pants", "Name":"Shirt", "Name":"Shoes"}];
	var escape = false;
	var jedRocks = 0;
	//if this variable reaches...20? You die. A horrible sudden death.
	var batteredness = 0;
}