const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('OutboxEvent', {

        aggregateId: { type: DataTypes.UUIDV4, allowNull: false },
        eventType: { type: DataTypes.STRING, DefaultValue: "OrderCreated", allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        processed: { type: DataTypes.BOOLEAN, default: false }
    });
}