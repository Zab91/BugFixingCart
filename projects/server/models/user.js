"use strict";
const { Model, BOOLEAN } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role);
      User.hasMany(models.Cart);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
        validate: { isEmail: true },
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      birthdate: {
        type: DataTypes.STRING,
      },
      profile_picture_url: {
        type: DataTypes.STRING,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verification_signature: {
        type: DataTypes.STRING,
      },
      // isAdmin: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      // },
      // role_id: {
      //   type: DataTypes.INTEGER,
      // },
      geolocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
