// Initializes the `current-user` service on path `/current-user`
const createService = require('./current-user.class.js');
const hooks = require('./current-user.hooks');

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/current-user', createService({ app }));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('current-user');

  service.hooks(hooks);
};
