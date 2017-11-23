'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    return queryInterface.createTable('spendingItems', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
      },
      spendingId: {
        type: DataTypes.UUID,
        references: { model: 'spendings' },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('spendingItems');
  }
};
