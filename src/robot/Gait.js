import {EventEmitter} from 'events';

const sleep = (msec) => { return new Promise(resolve => setTimeout(resolve, msec)); };
const noop = ()=>{};

class Movement extends EventEmitter {
	constructor(func = noop) {
		super();
		this.func = func;
	}
	async start() {
		const result = await this.func();
		this.emit('move-completed', this); // this doesn't emit when part of ComplexMovement (?)
		return result;
	}
}

class ComplexMovement extends EventEmitter {
	constructor(movements = []) {
		super();
		this.movements = movements; // expects array of Movements
	}
	async start(params) {
		this.emit("complex-started", this);
		for (const movement of this.movements) {
			// console.log("Starting: ", movement)
			await movement.start();
			this.emit('move-completed', movement);
		}

		this.emit('complex-completed', this);
	}	
}

class ForwardStep extends ComplexMovement {
	constructor(leg) {
		super([
			new Movement(async function() {await leg.push('up');}), 
			new Movement(async function() {await leg.rotate(30);}), // + forward, -back
			new Movement(async function() {await leg.push('down');}),
			new Movement(async function() {await leg.rotate(-30);})
		])
		this.leg = leg;
	}	
	async start(params) {
		await super.start(params);
		this.emit('forward-step-completed', this);
	}
}

export { Movement, ComplexMovement, ForwardStep }

export default class Gait extends ComplexMovement {
	constructor(legs = [], options = {movements: [], ...rest}) {
		super(options.movements, options.rest);
		this.legs = legs;
	}
	async start(params) {
		await super.start(params);
		this.emit('gait-completed', this);
	}
} 