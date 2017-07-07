"use strict";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var animator = null;
var rest = 60;

// var test = new Body([200,200], [0,0], [0,0], 1e33, "sun");
// var test2 = new Body([220, 220], [1, -1], [0, 0], 1e24, "earth");
// //var test3 = new Body([210, 400], [0, 1], [0, 0], 1e20, "doom");


$(document).ready(function() {

	// Create canvas
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	// Store celestial bodies
	var bodies = []

	for (var i = 0; i < 25; i++) {
		var xcoord = getRandomArbitrary(50, 450);
		var ycoord = getRandomArbitrary(50, 450);

		var xvel = getRandomArbitrary(-.01, .01);
		var yvel = getRandomArbitrary(-.01, .01);

		var rpow = getRandomArbitrary(32, 34);

		bodies.push(new Body([xcoord, ycoord], [xvel, yvel], [0,0], Math.pow(10, rpow), "star" + i));
	}

	//bodies.push(new Body([250, 250], [0, 0], [0, 0], 1e33, "black hole!"));

	// Fill canvas
	function draw() {
		ctx.fillStyle = "#000000";
		var pointSize = 3;

		// Clear canvas
		ctx.clearRect(0, 0, c.width, c.height);

		// Reset accelerations
		bodies.forEach(function(body) {
			body.ax = 0;
			body.ay = 0;

			ctx.beginPath();
			ctx.arc(body.x, body.y, Math.pow((Math.log10(body.mass)/32),1.5)*pointSize, 0, Math.PI*2);
			ctx.fill();
		});

		bodies.forEach(function(body) {
			bodies.forEach(function(body2) {
				if (body2.name != body.name) {
					body.applyForces(body2);
				};
			});
		});

		bodies.forEach(function(body) {
			body.deltaV(body.ax, body.ay);
			body.deltaX(body.vx, body.vy);
		});

		//test.prettyPrint;
	};

	$("#start").click(function () {
		console.log("Clicked!");

		if (animator == null) {
			animator = window.setInterval(draw, rest);
		};	
	});

	$("#end").click(function () {
		console.log("Clicked!");
		clearInterval(animator);
		animator = null;
		ctx.clearRect(0,0, c.width, c.height);
		bodies.forEach(function(body) {
			body.revert();
		});
	});

});


