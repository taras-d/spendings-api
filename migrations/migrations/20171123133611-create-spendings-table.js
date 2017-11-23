'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    return queryInterface.createTable('spendings', {
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
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('spendings');
  }
};
