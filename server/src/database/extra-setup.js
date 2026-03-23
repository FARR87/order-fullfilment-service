function applyExtraSetup(sequelize) {
    // console.log("Models:\n", sequelize);
    const { Order, OrderItem } = sequelize.models;

    Order.hasMany(OrderItem);
    OrderItem.belongsTo(Order);
}

module.exports = { applyExtraSetup };