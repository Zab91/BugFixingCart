'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Journal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      transaction_success: {
        type: DataTypes.STRING,
      },
      transaction_canceled: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Journal',
    }
  );
  return Journal;
};
