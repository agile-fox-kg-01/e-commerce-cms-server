'use strict';

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
      let data = [
        {
          name: 'Admin'
        },
        {
          name: 'User'
        }
      ];

      data = data.map((element) => {
        element.createdAt = new Date();
        element.updatedAt = new Date();

        return element;
      });

      await queryInterface.bulkInsert('AccessGroups', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('AccessGroups', null);
  }
};