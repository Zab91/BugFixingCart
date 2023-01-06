'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
      },
      postal_code: {
        type: DataTypes.INTEGER,
      },
      province_id: {
        type: DataTypes.INTEGER,
      },
      province: {
        type: DataTypes.STRING,
      },
      city_id: {
        type: DataTypes.INTEGER,
      },
      city: {
        type: DataTypes.STRING,
      },
      coordinate: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.DOUBLE,
      },
      longtitude: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};
