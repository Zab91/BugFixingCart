'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Discount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      percent: {
        type: DataTypes.DOUBLE,
      },
      store_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Discount',
    }
  );
  return Discount;
};
