'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      address: {
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
      modelName: 'Store',
    }
  );
  return Store;
};
