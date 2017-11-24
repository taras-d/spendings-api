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

// Create new items (remove old if this is patch)
const afterSave = async hook => {

  const spendingItemsService = hook.app.service('/spending-items'),
    data = hook.data;

  if (hook.method === 'patch' && 'items' in data) {
    // Remove old items
    await spendingItemsService.remove(null, {
      query: { spendingId: hook.result.id }
    });
  }

  // Create new items
  if (Array.isArray(data.items)) {
    data.items.forEach(item => item.spendingId = hook.result.id);
    await spendingItemsService.create(data.items);
  }

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
