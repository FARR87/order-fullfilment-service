const { Sequelize, DataTypes } = require('sequelize');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite-example-database/ordersFullfilment.sqlite',
  logQueryParameters: true,
  benchmark: true
});

const Order = sequelize.define('Order', {
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
// We define all models according to their files.
const OrderItem = sequelize.define('OrderItem', {
  sku: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, DefaultValue: 1, allowNull: false },
  unitPrice: { type: DataTypes.INTEGER, DefaultValue: 1, allowNull: false },
});
const OutboxEvents = sequelize.define('OutboxEvents', {

  aggregateId: { type: DataTypes.UUIDV4, allowNull: false },
  eventType: { type: DataTypes.STRING, DefaultValue: "OrderCreated", allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  processed: { type: DataTypes.BOOLEAN, default: false }
})

Order.hasMany(OrderItem);
Order.belongsTo(Order);
// We execute any extra setup after the models are defined, such as adding associations.
// We export the sequelize connection instance to be used around our app.
module.exports = { sequelize, models: [Order, OrderItem, OutboxEvents] };