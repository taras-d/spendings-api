const errors = require('@feathersjs/errors'),
  bcrypt = require('bcryptjs');

class Service {
  constructor (options) {
    this.app = options.app;
  }

  async find (params) {
    return this.app.service('users').get(params.user.id);
  }

  async patch (id, data, params) {
    return this.app.service('users').patch(params.user.id, data);
  }

  async remove (id, params) {
    const password = params.query.password;
    if (!password) {
      throw new errors.Forbidden();
    }

    const match = await bcrypt.compare(password, params.user.password);
    if (!match) {
      throw new errors.Forbidden();
    }

    return this.app.service('users').remove(params.user.id);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
