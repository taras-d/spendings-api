// Initializes the `spending-item-autocomplete` service on path `/spending-item-autocomplete`
const createService = require('./spending-item-autocomplete.class.js');
const hooks = require('./spending-item-autocomplete.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    name: 'spending-item-autocomplete',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/spending-item-autocomplete', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('spending-item-autocomplete');

  service.hooks(hooks);
};
