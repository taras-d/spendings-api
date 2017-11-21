const ping = require('./ping/ping.service.js');
const users = require('./users/users.service.js');
module.exports = function (app) {
  app.configure(ping);
  app.configure(users);
};
