// Initializes the `sensors` service on path `/sensors`

module.exports = function (app) {
  
  const robot = app.get('robot');

  // Initialize our service with any options it requires
  app.use('/sensors', { async get() { const {x, y, rz} = robot.sensors; return {x, y, rz}; } });

  // Get our initialized service so that we can register hooks
  const service = app.service('sensors');

  // service.hooks(hooks);
};
