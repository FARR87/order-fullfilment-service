'use strict';
const {
  Model
} = require('sequelize');
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
  Order.init({
    orderId: {
      type: DataTypes.UUID, primaryKey: true, allowNull: false,
    },
    customerId: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    orderStatus: DataTypes.ENUM('PENDING', 'FULLFILLED', 'BACKORDERED')
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};