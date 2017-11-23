const _ = require('lodash');

// Set user id and sum before creating or updating spending
const beforeSave = async hook => {
  const { data, method } = hook;

  data.userId = hook.params.user.id;

  if (
    method === 'create' || (method === 'patch' && 'items' in data)
  ) {
    data.sum = _.sumBy(data.items, 'cost');
  }

  return hook;
};

// Create new items (remove old if this is update)
const afterSave = async hook => {

  if (hook.method === 'patch') {
    // TODO: Remove old items
  }

  // TODO: Create new items

  // TODO: Add items to result
  return hook;
};

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async hook => {

    if (hook.type === 'before') {
      return beforeSave(hook);
    }
    
    if (hook.type === 'after') {
      return afterSave(hook);
    }

    return hook;
  };
};
