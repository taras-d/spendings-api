const { authenticate } = require('@feathersjs/authentication').hooks,
  { restrictToOwner } = require('feathers-authentication-hooks'),
  { discard, isProvider, iff, disallow, disableMultiItemChange } = require('feathers-hooks-common');

const processSpendingItems = require('../../hooks/spendings/process-spending-items');

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
      processSpendingItems()
    ],
    update: [
      disallow('external')
    ],
    patch: [
      disableMultiItemChange(),
      owner(),
      processSpendingItems()
    ],
    remove: [
      disableMultiItemChange(),
      owner()
    ]
  },

  after: {
    all: [
      iff(
        isProvider('external'),
        discard('userId', 'createdAt', 'updatedAt')
      )
    ],
    find: [],
    get: [],
    create: [
      processSpendingItems()
    ],
    update: [],
    patch: [
      processSpendingItems()
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
