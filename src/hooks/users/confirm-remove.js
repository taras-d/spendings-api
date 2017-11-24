const errors = require('@feathersjs/errors'),
  bcrypt = require('bcryptjs');

const throwForbidden = () => {
  throw new errors.Forbidden('Incorrect password');
};

const processPassword = () => async hook => {
  const query = hook.params.query;
  hook._confirmPassword = query.password;
  delete query.password;
};

const checkPassword = () => async hook => {
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

module.exports = { processPassword, checkPassword };