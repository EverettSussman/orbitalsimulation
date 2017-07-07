/*
Simulates the physics of our universe.  

Every pixel represents 10 million meters.  

Moon travels at 1,018 m/s, or 0.0001018 pixels per second.

Gravitational constant is 
6.674*10−20 km3/kg-s2

So G is 6.674*10-11 m3/(kg s2) * (1 px / (100000 km))^3 = 6.6740831 * 10-32 px3/(kg s2)

Moon is 384 million meters away, so 38.4 pixels away from earth.  

*/


class Universe {
	constructor(x, v, a) {
		this.x = x[0];
		this.y = x[1];
		this.vx = v[0];
		this.vy = v[1];
		this.ax = a[0];
		this.ay = a[1];
		this.G = 6.6740831*Math.pow(10, -32);

		this.x0 = x[0];
		this.y0 = x[1];
		this.vx0 = v[0];
		this.vy0 = v[1];
		this.ax0 = a[0];
		this.ay0 = a[1];
	}

	deltaX(x1, y1) {
		this.x += x1;
		this.y += y1;
	}

	deltaV(vx1, vy1) {
		this.vx += vx1;
		this.vy += vy1;
	}

	deltaA(ax1, ay1) {
		this.ax += ax1;
		this.ay += ay1;
	}

	distance(obj1) {
		var dx = (this.x - obj1.x);
		var dy = (this.y - obj1.y);
		var sumsquares = Math.pow(dx, 2) + Math.pow(dy, 2);
		var dist = Math.sqrt(sumsquares);
		if (dist < 2) {
			dist = 2;
		};
		return dist;
	}

	revert() {
		this.x = this.x0;
		this.y = this.y0;
		this.vx = this.vx0;
		this.vy = this.vy0;
		this.ax = this.ax0;
		this.ay = this.ay0;
	}
}

class Body extends Universe {
	constructor(x, v, a, mass, name) {
		super(x, v, a)
		this.mass = mass;
		this.name = name;
	}

	gravity(b1) {
		var forcex = this.G * b1.mass / Math.pow(this.distance(b1), 3) * (b1.x - this.x);
		var forcey = 1*this.G * b1.mass / Math.pow(this.distance(b1), 3) * (b1.y - this.y);
		return [forcex, forcey];
	}

	applyForces(b1) {
		// Calculate new acceleration vector
		this.deltaA(this.gravity(b1)[0], this.gravity(b1)[1]);
	}


	get prettyPrint() {
		console.log("xPos = " + this.x + "\n" +
					" yPos = " + this.y + "\n" +
					" vx = " + this.vx + "\n" +
					" vy = " + this.vy + "\n" +
					" ax = " + this.ax + "\n" +
					" ay = " + this.ay);
	}


}


// Tests
function assert(condition, message) {
	if (!condition) {
		throw message;
	}
};

// Universe tests 
function universeTests() {
	var t1 = new Universe([10,10], [0,0], [0,0]);
	assert(t1.x == 10, "Assertion Failure 1.");
	t1.deltaX(2, 5);
	assert(t1.x == 12 && t1.y == 15, "Assertion Failure 2.");
	var t2 = new Universe([10,10], [0,0], [0,0]);
	assert(t1.distance(t2) == Math.sqrt(4 + 25));
};

function bodyTests() {
	var b1 = new Body([1, 2], [0,0], [0,0], 100, "sun");
	assert(b1.x == 1 && b1.y == 2 && b1.mass == 100 
		&& b1.name == "sun", "Assertion Failure 3.");
	assert(b1.vx == 0 && b1.vy == 0, "Assertion Failure 4.");
	var b2 = new Body([10, 20], [0,0], [0,0], 100, "moon");
	b1.applyForces(b2);

};

function runAllTests() {
	universeTests();
	bodyTests();
};

runAllTests();






