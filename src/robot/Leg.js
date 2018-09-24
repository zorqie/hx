export default class Leg {
	constructor(id, angle = 0, position = 'down') {
		this.id = id;
		this.angle = angle; // midpoint = 0, in degrees (int)
		this.position = position; // start with leg down
		// need to be able to stop movement somehow
	}

	async rotate(angle) {
		const time = Math.abs(this.angle - angle) * 50
		await new Promise(resolve => setTimeout(resolve, time));
		this.angle = angle; 
		return this.angle;
	}

	async push(position) {
		const time = this.position==position ? 0 : 1000;
		await new Promise(resolve => setTimeout(resolve, time))
		this.position = position;	
		return this.position;
	}
}