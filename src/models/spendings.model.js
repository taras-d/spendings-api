// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const spendings = sequelizeClient.define('spendings', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4()
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'users' },
      allowNull: false,
      onDelete: 'CASCADE'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sum: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  spendings.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return spendings;
};
