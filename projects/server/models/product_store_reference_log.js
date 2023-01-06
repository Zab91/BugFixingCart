'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_store_reference_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_store_reference_log.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_store_reference_id: {
        type: DataTypes.INTEGER,
      },
      stock_previous: {
        type: DataTypes.INTEGER,
      },
      stock_current: {
        type: DataTypes.INTEGER,
      },
      journal_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Product_store_reference_log',
    }
  );
  return Product_store_reference_log;
};
