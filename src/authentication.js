const authentication = require('@feathersjs/authentication'),
  jwt = require('@feathersjs/authentication-jwt'),
  local = require('@feathersjs/authentication-local'),
  { discard, iff, isProvider } = require('feathers-hooks-common');

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        hook => {
          // By default use local strategy
          if (!hook.data.strategy) {
            hook.data.strategy = 'local';
          }
        },
        authentication.hooks.authenticate(config.strategies),
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        hook => {
          hook.result.user = hook.params.user;
        },
        iff(
          isProvider('external'),
          discard('user.password', 'user.createdAt', 'user.updatedAt')
        )
      ]
    }
  });
};
