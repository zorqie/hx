const io = require('socket.io-client');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(socketio(socket));

const sensorService = client.service('sensors');

sensorService.on('updated', sensors => console.log('Sensors updated:', sensors));

// Use the sensors service from the server
sensorService.update("123", {
  text: 'Message from client'
});