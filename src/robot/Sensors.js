export default class Sensors {
	constructor(value = {x: 0.0, y: 0.0, rz: 0.0}, delta = {x: 0.001, y: 0.001, rz: 0.1}) {
		console.log("Configuring Sensors: ", value, delta);
		this.d = delta;
		this.x = value.x;
		this.y = value.y;
		this.rz = value.rz;
		const {x,y,rz} = this
		console.log("Sensors -> ", {x,y,rz});
	}
	set x(val) {
		this._x = val + Math.random() * this.d.x;
	}
	get x() { return this._x; }

	set y(val) {
		this._y = val + Math.random() * this.d.y;
	}
	get y() { return this._y; }

	set rz(val) {
		this._rz = val + Math.random() * this.d.rz;
	}
	get rz() { return this._rz; }
}