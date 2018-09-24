
const noop = ()=>{};

class Movement {
	constructor(func = noop, options = {onComplete: noop}) {
		this.func = func;
		this.onComplete = options.onComplete;
	}
	async start() {
		const result = await this.func();
		this.onComplete();
		return result;
	}
}

class ComplexMovement {
	constructor(movements = [], options = {start: false, onComplete: noop, onStop: noop}) {
		this.movements = movements; // expects array of Movements
		this.onComplete = options.onComplete;
		if(options.start) { 
			this.start();
		}
	}
	async start() {
		console.log("Starting:", this);
		for (const movement of this.movements) {
			await movement.start();
		}
		this.onComplete();
	}	
}

class ForwardStep extends ComplexMovement {
	constructor(leg, options) {
		super([new Movement(async function() {
			await leg.push('up'); //up
			console.log(leg);

			await leg.rotate(30); // + forward, -back
			console.log(leg);

			await leg.push('down');
			console.log(leg);

			await leg.rotate(-30);
			console.log(leg);


		})], options)
		this.leg = leg;
		console.log("\n\nCreated: ", this)
	}	
}

export { Movement, ComplexMovement, ForwardStep }

export default class Gait extends ComplexMovement {
	constructor(legs = [], options = {movements: [], ...rest}) {
		super(options.movements, options);
		this.legs = legs;
		console.log("Created:", this);
	}
} 