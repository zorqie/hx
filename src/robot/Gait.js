import {EventEmitter} from 'events';

const noop = ()=>{};

class Movement extends EventEmitter {
	constructor(func = noop, params) {
		super();
		this.func = func;
		this.params = params;
	}
	async start() {
		console.log("Strarting ", this.func, this.params)
		const result = await this.func(this.params);
		this.emit('completed', this);
		return result;
	}
}

class ComplexMovement extends EventEmitter {
	constructor(movements = [], params, options = {start: false}) {
		super();
		this.movements = movements; // expects array of Movements
		this.params = params
		if(options.start) { 
			this.start(this.params);
		}
	}
	async start(params) {
		this.emit("started:", this);
		for (const movement of this.movements) {
			console.log("Starting: ", movement)
			await movement.start();
		}

		this.emit('completed', this);
	}	
}

class ForwardStep extends ComplexMovement {
	constructor(leg, params, options) {
		super([
			new Movement(leg.push, 'up', options), 
			new Movement(leg.rotate, 30, options), // + forward, -back
			new Movement(leg.push, 'down', options),
			new Movement(leg.rotate, -30, options)
		], options)
		this.leg = leg;
	}	
}

export { Movement, ComplexMovement, ForwardStep }

export default class Gait extends ComplexMovement {
	constructor(legs = [], options = {movements: [], ...rest}) {
		super(options.movements, options.rest);
		this.legs = legs;
		console.log("Created:", this);
	}
} 