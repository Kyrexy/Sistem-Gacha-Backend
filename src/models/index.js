const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

const connectionString = new URL(config.database.connection);
connectionString.pathname += config.database.name;

mongoose.connect(`${connectionString.toString()}`);

const db = mongoose.connection;

const dbExports = {};
dbExports.db = db;

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

db.once('open', async () => {
  logger.info('Successfully connected to MongoDB');

  const Prize = mongoose.model('Prize');
  const count = await Prize.countDocuments();
  if (count === 0) {
    await Prize.insertMany([
      { name: 'Emas 10 gram', Kuota: 1, sisaKuota: 1 },
      { name: 'Smartphone X', Kuota: 5, sisaKuota: 5 },
      { name: 'Smartwatch Y', Kuota: 10, sisaKuota: 10 },
      { name: 'Voucher Rp100.000', Kuota: 100, sisaKuota: 100 },
      { name: 'Pulsa Rp50.000', Kuota: 500, sisaKuota: 500 },
    ]);
    logger.info('Hadiah Sudah Dimasukkan');
  }
});

module.exports = dbExports;
