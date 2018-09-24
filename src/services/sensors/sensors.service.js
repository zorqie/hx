// Initializes the `sensors` service on path `/sensors`
const createService = require('./sensors.class.js');
const hooks = require('./sensors.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sensors', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sensors');

  service.hooks(hooks);
};
