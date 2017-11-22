const { authenticate } = require('@feathersjs/authentication').hooks,
  { disallow } = require('feathers-hooks-common'),
  { restrictToOwner } = require('feathers-authentication-hooks'),
  { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const jwt = () => authenticate('jwt'),
  owner = () => restrictToOwner({ idField: 'id', ownerField: 'id' });

module.exports = {
  before: {
    all: [ ],
    find: [ disallow('external') ],
    get: [
      jwt(),
      owner()
    ],
    create: [
      hashPassword()
    ],
    update: [
      jwt(),
      owner(),
      hashPassword()
    ],
    patch: [
      jwt(),
      owner(),
      hashPassword()
    ],
    remove: [
      jwt(),
      owner()
    ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
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
