// Initializes the `ping` service on path `/ping`
const createService = require('./ping.class.js');

module.exports = function (app) {
  
  // Initialize our service with any options it requires
  app.use('/ping', createService());

};
