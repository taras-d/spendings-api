// Initializes the `spendings` service on path `/spendings`
const createService = require('feathers-sequelize');
const createModel = require('../../models/spendings.model');
const hooks = require('./spendings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'spendings',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('spendings', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('spendings');

  service.hooks(hooks);
};
