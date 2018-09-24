import Gait, {ForwardStep} from './Gait'
import Leg from './Leg'
import Sensors from './Sensors'

export default class Robot {
	constructor(numLegs = 6) {
		this.legs = [];
		for(var i=0; i<numLegs; i++) {
			this.legs.push(new Leg(i));
		}
		this.sensors = new Sensors();
		this.gait = new Gait(this.legs, {onComplete: ()=>{console.log("---------------Completed. ", this.gait)}});
		const step1 = new ForwardStep(this.legs[0]);
		this.gait.movements.push(step1);

		this.gait.movements.push(new ForwardStep(this.legs[2]));
		this.gait.movements.push(new ForwardStep(this.legs[4]));
		this.gait.movements.push(new ForwardStep(this.legs[1]));
		this.gait.movements.push(new ForwardStep(this.legs[3]));
		this.gait.movements.push(new ForwardStep(this.legs[5]));
		console.log("Created robot with gait:\n", this.gait.movements);
		console.log("\n\n");

		this.gait.start();

		new Promise(resolve => setTimeout(resolve, 3000)).then(()=>this.gait.stop());

		this.gait.start();
	}
}