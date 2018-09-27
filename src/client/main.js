const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

const socket = io(/*'http://localhost:3030'*/);
const client = feathers().configure(socketio(socket));

const sensorService = client.service('sensors');


// Use the sensors service from the server
// sensorService.update("123", {
//   text: 'Message from client'
// });

const robotService = client.service('robot');

sensorService.on('updated', sensors => console.log('Sensors updated:', sensors));
robotService.on('updated', data => {
	// console.log("Move completed: ", data);
	document.getElementById('robotStats').innerHTML = robotStats(data.robot);
});

window.hx = client;
var robotStarter = function() {
	robotService.create({command: 'start'});
	console.log("Robot started.");
} 

document.getElementById('robot.start').addEventListener('click', robotStarter);

const robotStats = robot => `<table id="robotStats" class="hxstats">
				<tbody>
					<tr>
						<td>${legStats(robot.legs[0], true)}</td>
						<td>0</td>
						<td>1</td>
						<td>${legStats(robot.legs[1], false)}</td>
					</tr>
					<tr>
						<td>${legStats(robot.legs[2], true)}</td>
						<td>2</td>
						<td>3</td>
						<td>${legStats(robot.legs[3], false)}</td>
					</tr>
					<tr>
						<td>${legStats(robot.legs[4], true)}</td>
						<td>4</td>
						<td>5</td>
						<td>${legStats(robot.legs[5], false)}</td>
					</tr>
				</tbody>
			</table>`;

const legStats = (leg, odd) => 
	odd 
	? `${leg.position} ${leg.angle}&deg;`
	: `${leg.angle}&deg; ${leg.position}`;