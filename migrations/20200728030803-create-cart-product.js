'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CartProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CartId: {
        allowNull: false,
        references: {
          model: 'Carts',
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
      status: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('CartProducts');
  }
};