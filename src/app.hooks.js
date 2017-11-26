// Application hooks that run for every service
const { iff } = require('feathers-hooks-common');

const logger = require('./hooks/logger');

module.exports = {
  before: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ 
      iff(process.env.NODE_ENV !== 'test', logger())
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
