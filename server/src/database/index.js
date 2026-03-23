const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite-database/ordersFullfilment.sqlite',
  logQueryParameters: true,
  benchmark: true
});


const modelDefiners = [
  require('./models/order.model'),
  require('./models/orderItem.model'),
  require('./models/outboxEvent.model'),
];
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
applyExtraSetup(sequelize);
// We execute any extra setup after the models are defined, such as adding associations.
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;