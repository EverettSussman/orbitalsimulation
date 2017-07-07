// Define animation functions

function titleFadeIn() {
	$('#Main-title').css('opacity', 1);
	$('#Main-title').fadeIn(2500);
};

function subTitleFadeIn() {
	$('#Sub-title').css('opacity', 1);
	$('#Sub-title').fadeIn(2500);
};

function navFadeIn() {
	$('.nav-button').css('opacity', 1);
	$('.nav-button').fadeIn(3500);
}


$(document).ready(function() {

	// Title and navbar fades in
	setTimeout(titleFadeIn, 1500);
	setTimeout(subTitleFadeIn, 2500);
	setTimeout(navFadeIn, 4000);


});