const { authenticate } = require('@feathersjs/authentication').hooks,
  { restrictToOwner } = require('feathers-authentication-hooks'),
  { discard, isProvider, iff, disallow, disableMultiItemChange, populate } = require('feathers-hooks-common');

const saveSpendingItems = require('../../hooks/spendings/save-spending-items');

const owner = () => restrictToOwner({ idField: 'id', ownerField: 'userId' });

const populateItems = [
  populate({
    schema: {
      include: {
        service: 'spending-items',
        nameAs: 'items',
        parentField: 'id',
        childField: 'spendingId',
        query: {
          $select: ['id', 'name', 'cost']
        },
        asArray: true,
        provider: undefined
      }
    }
  }),
  discard('_include')
];

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
      saveSpendingItems()
    ],
    update: [
      disallow('external')
    ],
    patch: [
      disableMultiItemChange(),
      owner(),
      saveSpendingItems()
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
    find: [
      ...populateItems
    ],
    get: [
      ...populateItems
    ],
    create: [
      saveSpendingItems(),
      ...populateItems
    ],
    update: [],
    patch: [
      saveSpendingItems(),
      ...populateItems
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
