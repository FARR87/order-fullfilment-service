'use strict'
const { sequelize, models } = require("../src/database");
//const { pickRandom, randomDate } = require('./helpers/random');

async function reset() {
    console.log('Will rewrite the SQLite example database, adding some dummy data.');
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log('Done!');
}

reset();