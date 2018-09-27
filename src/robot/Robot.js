import {EventEmitter} from 'events';

import Gait, {ForwardStep} from './Gait'
import Leg from './Leg'
import Sensors from './Sensors'

export default class Robot extends EventEmitter {
	constructor(numLegs = 6) {
		super();
		this.sensors = new Sensors();
		this.legs = [];
		this.gait = new Gait(this.legs, {});
		this.gait.on('gait-completed', 
			(which) => {
				// console.log("Gait completed", which);
				this.emit('gait-completed', which, this);
			});
		
		for(var i=0; i<numLegs; i++) {
			this.legs.push(new Leg(i));
		}
		

		// this.gait.movements.push(new ForwardStep(this.legs[2]));
		// this.gait.movements.push(new ForwardStep(this.legs[4]));
		// this.gait.movements.push(new ForwardStep(this.legs[1]));
		// this.gait.movements.push(new ForwardStep(this.legs[3]));
		// this.gait.movements.push(new ForwardStep(this.legs[5]));
		console.log("Created robot:\n", this);
		console.log("\n\n");

		// this.start();
	}
	async start() {
		for(var i of [0, 3, 4, 1, 2, 5]) {
			const step = new ForwardStep(this.legs[i]);
			// step.on('forward-step-completed', s => console.log("Step completed", s));
			step.on('move-completed', 
				s => {
					this.emit('move-completed', s, this);
					// console.log("Move completed", s);
				}
			);
			this.gait.movements.push(step);
		}

		await this.gait.start();

		await new Promise(resolve => setTimeout(resolve, 3000));

		await this.gait.start();
	}
	
}