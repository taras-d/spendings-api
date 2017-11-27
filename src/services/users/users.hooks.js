const { disallow } = require('feathers-hooks-common'),
  { hashPassword } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [
      disallow('external')
    ],
    get: [
      disallow('external')
    ],
    create: [
      hashPassword()
    ],
    update: [
      disallow('external')
    ],
    patch: [
      disallow('external')
    ],
    remove: [
      disallow('external')
    ]
  },

  after: {
    all: [],
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
