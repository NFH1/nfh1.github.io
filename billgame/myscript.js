const levels = [ 
	//level 0
	["flag", "boulder","","","","","","",
	"bridge","boulder","","","","","","",
	"","tree","","","","","","guyleft",
	"","water","","","","","","",
	"","wallup","animate","animate","animate","animate","animate","animate",
	"","boulder","","","","","","",
	"","tree","","","","","","",
	"","tree","","","","","gem",""],

	// level 1
	["", "","flag","","","","water","",
	"wall","wall","wall","wall","wall","wall","water","",
	"","","","","","","bridge","",
	"","","","","","","water","",
	"","","","","","","water","",
	"","","","","","","water","gem",
	"animate","animate","animate","animate","animate","animate","tree","boulder",
	"","","","","guyleft","","",""],


	// level 2
	["", "","","guyleft","","","","",
	"","","","","","","","",
	"","","","","","","","",
	"","","","boulder","wall","boulder","","",
	"","","","boulder","flag","boulder","","",
	"","","","","boulder","","","",
	"","","","animate","animate","animate","","",
	"","","","tree","gem","tree","",""]


];// levels

var currentLocationOfGuy = 0;
var widthOfBoard = 8;
var currentAnimation; // allows 1 animation per level
var currentLevel = 0; // starting level
var isGem = false; // does the player have the gem
var currentLocationOfGem = 0;
const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["boulder", "tree", "water"];

// start game
window.addEventListener("load", function (){
	loadLevel();
});


// move horse
document.addEventListener("keydown", function (e){

	switch (e.keyCode) {
		case 37: // left arrow
			if(currentLocationOfGuy % widthOfBoard !== 0) {
				tryToMove("left");
			} // if
			break;
		case 38: //up arrow
			if(currentLocationOfGuy - widthOfBoard >= 0) {
				tryToMove("up");
			} // if
			break;
		case 39: // right arrow
			if(currentLocationOfGuy %  widthOfBoard < widthOfBoard - 1){
				tryToMove("right")
			} // if
			break;
		case 40: // down arrow
		if(currentLocationOfGuy + widthOfBoard < widthOfBoard * widthOfBoard){
				tryToMove("down");
			} // if
	} // switch
}); // key event listener


// try to move guy
function tryToMove(direction) {
	
	// location before move
	let oldLocation = currentLocationOfGuy;

	// class of location before move
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0; // location we wish to move to
	let nextClass = ""; // class of location we wish to move to

	let nextLocation2 = 0;
	let nextClass2 = "";

	let newClass = ""; // new class to switch to if move successful

	switch (direction) {
		case "left":
			console.log("move left");
			nextLocation = currentLocationOfGuy - 1;
			break;
		case "right":
			console.log("move right");
			nextLocation = currentLocationOfGuy + 1;
			break;
		case "up":
			console.log("move up");
			nextLocation = currentLocationOfGuy - widthOfBoard;
			break;
		case "down":
			console.log("move down");
			nextLocation = currentLocationOfGuy + widthOfBoard;
			break;
	} // swtich

	nextClass = gridBoxes[nextLocation].className;

	// if the obstacle is not passable, don't move
	if (noPassObstacles.includes(nextClass)) {  return; }

	// if it's a wall, and there is no gem, don't move
	if(!isGem && nextClass.includes("wall")) {  return; }

	// if there is a wall, move two spaces with animation
	if(nextClass.includes("wall")){


		//must have gem to jump
		if(isGem){
			gridBoxes[currentLocationOfGuy].className = "";

			// set values according to direction
			if(direction == "left") {
				nextClass = "jumpwallleft";
				nextClass2 = "guygemleft";
				nextLocation2 = nextLocation - 1;
			} else if(direction == "right") {
				nextClass = "jumpwallright";
				nextClass2 = "guygemright";
				nextLocation2 = nextLocation + 1;
			} else if(direction == "up") {
				nextClass = "jumpwallup";
				nextClass2 = "guygemup";
				nextLocation2 = nextLocation - widthOfBoard;
			} else if(direction == "down") {
				nextClass = "jumpwall";
				nextClass2 = "guygemdown";
				nextLocation2 = nextLocation + widthOfBoard;
			}

			//show guy jumping
			gridBoxes[nextLocation].className = nextClass;

			setTimeout(function() {

				// set jump back to just a wall
				gridBoxes[nextLocation].className = oldClassName;

				// update current location of guy to be 2 spaces past take off
				currentLocationOfGuy = nextLocation2;

				// get class of box after jump
				nextClass = gridBoxes[currentLocationOfGuy].className;

				//show guy and gem after landing
				gridBoxes[currentLocationOfGuy].className = nextClass2;

				//if next box is a flag, go up a level
				levelUp(nextClass);
			}, 100)
			return;

		} // if guy has gem

	} // if class has wall
	

	//if there is a gem, add gem
	if (nextClass == "gem") {
		isGem = true;
	}

	//if there is a bridge in the old location keep it
	if(oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	} // else

	// build name of new class
	newClass = (isGem) ? "guygem" : "guy";
	newClass += direction;

	// if there is a bridge in the next location, keep it
	if(gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	}
	// move 1 space
	currentLocationOfGuy= nextLocation;
	gridBoxes[currentLocationOfGuy].className = newClass;


	// if it is an enemy
	if(nextClass.includes("spider")) {
		document.getElementById("lose").style.display = "block";
		return;
	}

	// move up to next level if needed
	levelUp(nextClass);

} // tryToMove


//move up a level
function levelUp(nextClass) {
	if(nextClass == "flag" && isGem) {
		document.getElementById("levelup").style.display = "block"
		clearTimeout(currentAnimation);
		setTimeout (function(){
			document.getElementById("levelup").style.display = "none"
			currentLevel++;
			loadLevel();

		}, 1000);
	} // if
} // levelUp


// load levels 0 - maxlevel
function loadLevel(){
	let levelMap = levels[currentLevel]
	let animateBoxes
	isGem = false;

	// load board
	for (i = 0; i < gridBoxes.length; i++){
		gridBoxes [i].className = levelMap[i];
		if(levelMap[i].includes("guyleft")) currentLocationOfGuy = i;
	} // for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");


}// loadLevel

// animate enemies left to right (could add up and down to this)
function animateEnemy(boxes, index, direction) {

	// exit function if no animation
	if (boxes.length <= 0) { return; }

	// update images
	if (direction == "right") {
		boxes[index].classList.add("spiderright");
	} else {
		boxes[index].classList.add("spiderleft");
	} // else

	// remove images from other boxes
	for(i = 0; i <boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("spiderleft");
			boxes[i].classList.remove("spiderright");
			
		}
	} // for

	// moving right
	if (direction == "right") {
		//turn around if hit right side
		if (index == boxes.length - 1){
			index--;
			direction = "left";
		} else {
			index++;
		}

	//moving left 
	} else {
		// turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		} // else
	} // else


	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);
} // animateEnemy