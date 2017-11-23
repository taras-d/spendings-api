const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

module.exports = function (app) {
  const connectionString = app.get('sqlite');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'sqlite',
    logging: env === 'development'? console.log: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    return result;
  };
};
