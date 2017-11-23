const { disallow, discard } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      disallow('external')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      discard('spendingId', 'createdAt', 'updatedAt')
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
