// changet the visibility of divID
function changeVisibility(divID){
	var element = document.getElementById(divID);

	// if element exists, toggle its class
	// between hidden and unhidden
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	} // if
} //changeVisibility

// display light box with BigImage in it
function displayLightBox(imageFile, alt){
	
	var image = new Image();
	var bigImage = document.getElementById("bigImage");

	image.src = "images/" + imageFile;
	image.alt = alt;

	image.onload = function () {
		var width = image.width;
		document.getElementById("boundaryBigImage").style.width = width + "px";
	};



	bigImage.src = image.src;
	bigImage.alt = image.alt;

	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage');


} //displayLightBox 