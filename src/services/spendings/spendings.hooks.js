const { authenticate } = require('@feathersjs/authentication').hooks,
  { restrictToOwner } = require('feathers-authentication-hooks'),
  { disallow, disableMultiItemChange, discard } = require('feathers-hooks-common');

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
    find: [],
    get: [],
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
