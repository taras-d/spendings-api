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

  const spendingItemsService = hook.app.service('/spending-items');

  if (hook.method === 'patch') {
    // Remove old items
    await spendingItemsService.remove(null, {
      query: { spendingId: hook.result.id }
    });
  }

  // Create items
  const items = hook.data.items;
  if (items) {
    items.forEach(item => item.spendingId = hook.result.id);
    hook.result.items = await spendingItemsService.create(hook.data.items);
  } else {
    hook.result.items = [];
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
