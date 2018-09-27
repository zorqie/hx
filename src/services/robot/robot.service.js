// Initializes the `commands` service on path `/commands`
const createService = require('./robot.class.js');
const hooks = require('./robot.hooks');

module.exports = function (app) {
	
	const robot = app.get('robot');

	const options = {
		robot
	};

	// Initialize our service with any options it requires
	app.use('/robot', createService(options));

	// Get our initialized service so that we can register hooks
	const service = app.service('robot');

	robot.on('move-completed', (move, robot) => service.update('all', {move, robot}));

	service.hooks(hooks);
};
