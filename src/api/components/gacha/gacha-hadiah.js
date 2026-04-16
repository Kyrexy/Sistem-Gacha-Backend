const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const prizes = [
  { name: 'Emas 10 gram', Kuota: 1, sisaKuota: 1, probability: 0.005 },
  { name: 'Smartphone X', Kuota: 5, sisaKuota: 5, probability: 0.02 },
  { name: 'Smartwatch Y', Kuota: 10, sisaKuota: 10, probability: 0.04 },
  {
    name: 'Voucher Rp100.000',
    Kuota: 100,
    sisaKuota: 100,
    probability: 0.15,
  },
  { name: 'Pulsa Rp50.000', Kuota: 500, sisaKuota: 500, probability: 0.3 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);

    const Prize = require('../../../models/prize.model')(mongoose);

    await Prize.deleteMany({});
    await Prize.insertMany(prizes);
    process.exit(0);
  } catch (err) {
    console.error('❌ Pengisian Data Hadiah Gagal:', err);
    process.exit(1);
  }
};

seed();
