'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name is required`
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: `Image URL format invalid`
        },
        notEmpty: {
          args: true,
          msg: `Image URL is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: `Price should be in number format`
        },
        notEmpty: {
          args: true,
          msg: `Price is required`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: `Price should be in number format`
        },
        notEmpty: {
          args: true,
          msg: `Stock is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};