'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_status_id: {
        type: DataTypes.INTEGER,
      },
      proof_image_url: {
        type: DataTypes.STRING,
      },
      payment_date: {
        type: DataTypes.STRING,
      },
      shipping_fee: {
        type: DataTypes.STRING,
      },
      order_item_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
