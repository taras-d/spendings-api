const ping = require('./ping/ping.service.js');
module.exports = function (app) {
  app.configure(ping);
};
