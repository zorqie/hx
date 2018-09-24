// Initializes the `commands` service on path `/commands`
const createService = require('./commands.class.js');
const hooks = require('./commands.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/commands', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('commands');

  service.hooks(hooks);
};
