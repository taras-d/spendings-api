// Initializes the `spendingItems` service on path `/spending-items`
const createService = require('feathers-sequelize');
const createModel = require('../../models/spending-items.model');
const hooks = require('./spending-items.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'spending-items',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/spending-items', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('spending-items');

  service.hooks(hooks);
};
