/* eslint-disable no-unused-vars */
class Service {
  
  setup(app) {
    this.app = app;
  }

  async find (params) {
    const sql = `
SELECT DISTINCT spendingItems.name
FROM spendingItems
LEFT JOIN spendings ON spendings.id = spendingItems.spendingId
WHERE spendings.userId = :userId AND spendingItems.name LIKE :search ESCAPE '/'
ORDER BY spendingItems.name ASC
LIMIT 0, 5;`;

    const sequelize = this.app.get('sequelizeClient');

    const result = await sequelize.query(sql, {
      replacements: {
        userId: params.user.id,
        search: (params.query.search || '').replace(/(%|_)/g, '/$1') + '%'
      },
      type: sequelize.QueryTypes.SELECT
    });

    return result.map(i => i.name);
  }
  
}

module.exports = function () {
  return new Service();
};

module.exports.Service = Service;
