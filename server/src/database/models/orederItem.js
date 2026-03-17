'use strict';
import { DataTypes } from 'sequelize'
import { default as Order } from 'order.js'
module.exports = (sequelize) => {
    sequelize.define('OrderItem', {

        sku: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, DefaultValue: 1, allowNull: false },
        unitPrice: { type: DataTypes.INTEGER, DefaultValue: 1, allowNull: false },
    });
};
