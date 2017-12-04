const ping = require('./ping/ping.service.js');
const users = require('./users/users.service.js');
const spendings = require('./spendings/spendings.service.js');
const spendingItems = require('./spending-items/spending-items.service.js');
const currentUser = require('./current-user/current-user.service.js');
const spendingItemAutocomplete = require('./spending-item-autocomplete/spending-item-autocomplete.service.js');
module.exports = function (app) {
  app.configure(ping);
  app.configure(users);
  app.configure(spendings);
  app.configure(spendingItems);
  app.configure(currentUser);
  app.configure(spendingItemAutocomplete);
};
