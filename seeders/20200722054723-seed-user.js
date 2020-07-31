'use strict';

const { hashPassword } = require("../helpers/bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

      const data = [
        {
          name: 'Admin',
          email: 'testadmin@admin.com',
          password: hashPassword('12345'),
          AccessGroupId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Users', null);
  }
};
