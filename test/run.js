
if (process.env.NODE_ENV !== 'test') {
  console.warn(
    'Tests can be run only in "test" environment. ' +
    'Check "process.env.NODE_ENV" variable.'
  );
  process.exit();
}

require('./app.test');
require('./services/ping.test');
require('./services/users.test');
require('./services/authentication.test');
require('./services/current-user.test');
require('./services/spendings.test');
require('./services/spending-item-autocomplete.test');