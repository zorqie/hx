const commands = require('./commands/commands.service.js');
const sensors = require('./sensors/sensors.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(commands);
  app.configure(sensors);
};
