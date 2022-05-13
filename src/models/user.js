'use strict';
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
  }
  User.init({
    unique: DataTypes.STRING,
    class_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    followers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: "Users"
  });
  return User;
};