'use strict';
import { DataTypes } from 'sequelize'
module.exports = (sequelize) => {
    sequelize.define('OutboxEvents', {

        aggregateId: { type: DataTypes.UUIDV4, allowNull: false },
        eventType: { type: DataTypes.STRING, DefaultValue: "OrderCreated", allowNull: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        processed: { type: DataTypes.BOOLEAN, default: false }
    });
};
