const { authenticate } = require('@feathersjs/authentication').hooks,
  { restrictToOwner } = require('feathers-authentication-hooks'),
  { discard, isProvider, iff, disallow, disableMultiItemChange } = require('feathers-hooks-common');

const processSpending = require('../../hooks/spending/process-spending');

const owner = () => restrictToOwner({ idField: 'id', ownerField: 'userId' });

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [
      owner()
    ],
    get: [
      owner()
    ],
    create: [
      processSpending()
    ],
    update: [
      disallow()
    ],
    patch: [
      disableMultiItemChange(),
      owner(),
      processSpending()
    ],
    remove: [
      disableMultiItemChange(),
      owner()
    ]
  },

  after: {
    all: [],
    find: [
      iff(isProvider('external'), discard('userId'))
    ],
    get: [
      iff(isProvider('external'), discard('userId'))
    ],
    create: [
      processSpending()
    ],
    update: [],
    patch: [
      processSpending()
    ],
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
