function applyExtraSetup(sequelize) {
    const { order, orderItem } = sequelize.models;

    order.hasMany(orderItem);
    orderItem.belongsTo(order);
}

module.exports = { applyExtraSetup };