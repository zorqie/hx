/* eslint-disable no-unused-vars */

class Service {
  constructor (options) {
    this.options = options || {};
    this.robot = options.robot;
  }

  async find (params) {
    const {legs, sensors, gait} = this.robot;
    const {movements, ...others} = gait; // hide some internals
    const {x, y, rz} = sensors;
    return {legs, sensors: {x, y, rz}};
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    const { command } = data;
    switch(command) {
      case 'start': 
        this.robot.start();
        break;

    }
    return data;
  }

  async update (id, data, params) {
    console.log("UPDATING: ", data);
    this.emit('updated', data);
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
