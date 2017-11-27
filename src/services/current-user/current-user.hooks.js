const { authenticate } = require('@feathersjs/authentication').hooks,
  { discard } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      discard('id', 'email', 'password', 'createdAt', 'updatedAt')
    ],
    remove: []
  },

  after: {
    all: [
      discard('password', 'createdAt', 'updatedAt')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
