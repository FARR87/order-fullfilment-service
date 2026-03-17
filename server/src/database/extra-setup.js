function applyExtraSetup(sequelize) {
    const { Order, orderItem } = sequelize.models;

    order.HasMany(orderItem);
    orderItem.BelongsTo(order);
}

module.exports = { applyExtraSetup };