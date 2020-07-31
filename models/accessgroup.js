'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessGroup.hasMany(models.User);
    }
  };
  AccessGroup.init({
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'AccessGroup',
  });
  return AccessGroup;
};