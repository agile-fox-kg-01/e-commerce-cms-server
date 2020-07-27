'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'ichlas@gmail.com',
      password: '$2a$05$kcz709yX.KGXUmIoiN80Juya/QPnhxN/U7u6tpOgIhPrtVK69KIPG',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
