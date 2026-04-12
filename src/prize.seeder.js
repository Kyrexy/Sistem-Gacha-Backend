const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Prize = require('../models/prize.model');

const prizes = [
  { name: 'Emas 10 gram', quota: 1, remainingQuota: 1, probability: 0.005 },
  { name: 'Smartphone X', quota: 5, remainingQuota: 5, probability: 0.02 },
  { name: 'Smartwatch Y', quota: 10, remainingQuota: 10, probability: 0.04 },
  {
    name: 'Voucher Rp100.000',
    quota: 100,
    remainingQuota: 100,
    probability: 0.15,
  },
  { name: 'Pulsa Rp50.000', quota: 500, remainingQuota: 500, probability: 0.3 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Prize.deleteMany({});
    await Prize.insertMany(prizes);

    console.log('✅ Prizes seeded successfully:');
    prizes.forEach((p) => console.log(`  - ${p.name} (kuota: ${p.quota})`));

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
