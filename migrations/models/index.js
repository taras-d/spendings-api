const app = require('../../src/app');

const sequelize = app.get('sequelizeClient');

module.exports = {
    Sequelize: sequelize.Sequelize,
    sequelize,
    models: sequelize.models
};