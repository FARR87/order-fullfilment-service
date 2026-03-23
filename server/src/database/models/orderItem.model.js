const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('OrderItem', {
        sku: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, DefaultValue: 1, allowNull: false },
        unitPrice: { type: DataTypes.INTEGER, DefaultValue: 1, allowNull: false },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    });
}