'use strict';
const {hashPassword} = require('../helper/bcrypt.js')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required!"
        },
        isEmail: {
          args: true,
          msg: "Please input a valid email!"
        }
      }
    },
    role: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)
    
    if (instance.role == '' || instance.role == undefined) {
      instance.role = 'user'
    }
  })
  return User;
};