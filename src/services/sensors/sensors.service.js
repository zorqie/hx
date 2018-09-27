// Initializes the `sensors` service on path `/sensors`

module.exports = function (app) {
  
  const robot = app.get('robot');

  const sensorService = { 
  	async find() { const {x, y, rz} = robot.sensors; return {x, y, rz}; },
  	async update(id, data, params) { return data; }
  }

  // Initialize our service with any options it requires
  app.use('/sensors', sensorService);
  robot.on('move-completed', (which, robot) => sensorService.update('all', {which, robot}));

  // Get our initialized service so that we can register hooks
  const service = app.service('sensors');

  // service.hooks(hooks);
};
