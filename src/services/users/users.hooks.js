const { authenticate } = require('@feathersjs/authentication').hooks,
  { disallow, disableMultiItemChange, discard, iff, isProvider } = require('feathers-hooks-common'),
  { restrictToOwner } = require('feathers-authentication-hooks'),
  { hashPassword } = require('@feathersjs/authentication-local').hooks;

const checkPasswordBeforeRemove = require('../../hooks/users/check-password-before-remove');

const jwt = () => authenticate('jwt'),
  owner = () => restrictToOwner({ idField: 'id', ownerField: 'id' });

module.exports = {
  before: {
    all: [],
    find: [
      disallow('external')
    ],
    get: [
      jwt(),
      owner()
    ],
    create: [
      hashPassword()
    ],
    update: [
      disallow('external')
    ],
    patch: [
      disableMultiItemChange(),
      discard('email', 'password', 'updatedAt', 'createdAt'),
      jwt(),
      owner()
    ],
    remove: [
      hook => { 
        const query = hook.params.query;
        hook._confirmPassword = query.password;
        delete query.password;
      },
      disableMultiItemChange(),
      jwt(),
      owner(),
      checkPasswordBeforeRemove()
    ]
  },

  after: {
    all: [
      iff(
        isProvider('external'),
        discard('password', 'createdAt', 'updatedAt')
      )
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
