'use strict';
import { DataTypes } from 'sequelize'
module.exports = (sequelize) => {
  sequelize.define('Order', {
    orderId: {
      type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4
    },
    customerId: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    orderStatus: DataTypes.ENUM('PENDING', 'FULLFILLED', 'BACKORDERED')
  })
};
