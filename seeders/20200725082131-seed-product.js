'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    const products = JSON.parse(fs.readFileSync('./data/product.json', 'utf-8'))
    products.map( product => {
      product.createdAt = new Date()
      product.updatedAt = new Date()
      return product
    })
    return queryInterface.bulkInsert('Products', products, {})

  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     queryInterface.bulkDelete('Products', null, {});

  }
};
