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
      Product.belongsTo(models.Category);
      Product.hasMany(models.CartProduct);
      Product.belongsToMany(models.Cart, {
        through: models.CartProduct
      });
      Product.hasMany(models.TransactionDetail);
      Product.belongsToMany(models.Transaction, {
        through: models.TransactionDetail
      });
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
          msg: `Stock should be in number format`
        },
        notEmpty: {
          args: true,
          msg: `Stock is required`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Product's category is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};