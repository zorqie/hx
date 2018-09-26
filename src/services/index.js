const robot = require('./robot/robot.service.js');
const sensors = require('./sensors/sensors.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(robot);
  app.configure(sensors);
};
