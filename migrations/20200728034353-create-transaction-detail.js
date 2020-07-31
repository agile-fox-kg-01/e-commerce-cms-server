'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TransactionDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TransactionId: {
        allowNull: false,
        references: {
          model: 'Transactions',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      ProductId: {
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
        type: Sequelize.INTEGER
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TransactionDetails');
  }
};