const levels = [ 
	//level 0
	["flag", "boulder","","","","","","",
	"bridgeup","boulder","","","","","","",
	"","tree","","","","","","guyleft",
	"","water","","","","","","",
	"","bridge","animate","animate","animate","animate","animate","animate",
	"","boulder","","","","","","",
	"","tree","","","","","","",
	"","tree","","","","","gem",""]

	// level 1

];// levels

var currentAnimation; // allows 1 animation per level
var currentlevel = 0; // starting level
var isGem = false; // does the player have the gem
var currentLocationOfGem = 0;
const gridBoxes = document.querySelectorAll("#gameBoard div");

// start game
window.addEventListener("load", function (){
	loadLevel();

});




// load levels 0 - maxlevel
function loadLevel(){
	let levelMap = levels[currentlevel]
	let animateBoxes
	isGem = false;

	// load board
	for (i = 0; i < gridBoxes.length; i++){
		gridBoxes [i].className = levelMap[i];
		if(levelMap[i].includes("gem")) currentLocationOfGem = i;
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
		boxes[index].classList.add("spiderr");
	} else {
		boxes[index].classList.add("spiderl");
	} // else

	// remove images from other boxes
	for(i = 0; i <boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("spiderl");
			boxes[i].classList.remove("spiderr");
			
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