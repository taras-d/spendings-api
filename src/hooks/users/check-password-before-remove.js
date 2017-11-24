const errors = require('@feathersjs/errors'),
  bcrypt = require('bcryptjs');

const throwForbidden = () => {
  throw new errors.Forbidden('Incorrect password');
};

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async hook => {
    const confirmPassword = hook._confirmPassword,
      { user } = hook.params;

    if (!confirmPassword) {
      throwForbidden();
    }

    const match = await bcrypt.compare(confirmPassword, user.password);
    if (!match) {
      throwForbidden();
    }

    return hook;
  };
};
