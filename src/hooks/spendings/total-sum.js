module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async hook => {
    const sequelize = hook.app.get('sequelizeClient'),
      where = { userId: hook.params.user.id };

    const date = hook.params.query.date;
    if (date) {
      where.date = date;
    }

    hook.result.totalSum = await sequelize.models.spendings.sum('sum', { where }) || 0;

    return hook;
  };
};
