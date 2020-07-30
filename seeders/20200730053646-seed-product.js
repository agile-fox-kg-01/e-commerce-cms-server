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
          name: 'Macbook Pro',
          imageURL: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp",
          price: 30000000,
          stock: 10,
          CategoryId: 1
        },
        {
          name: 'Macbook Pro Touchbar',
          imageURL: "https://cf.shopee.co.id/file/9bebad05b9f57f1e1266e9ebaaba1288",
          price: 40000000,
          stock: 20,
          CategoryId: 1
        }
      ];

      data = data.map((element) => {
        element.createdAt = new Date();
        element.updatedAt = new Date();

        return element;
      });

      await queryInterface.bulkInsert('Products', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Products', null);
  }
};
