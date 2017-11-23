const app = require('../../src/app');

const sequelize = app.get('sequelizeClient');

module.exports = Objsect.assign({
    Sequelize: sequelize.Sequelize,
    sequelize
}, models);