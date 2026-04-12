const gachaRepository = require('./gacha-repository');

const MAX_GACHA_PER_DAY = 5;
const PRIZE_PROBABILITIES = {
  'Emas 10 gram': 0.005,
  'Smartphone X': 0.02,
  'Smartwatch Y': 0.04,
  'Voucher Rp100.000': 0.15,
  'Pulsa Rp50.000': 0.3,
};

const performGacha = async ({ userId, userName }) => {
  const todayCount = await gachaRepository.countUserGachaToday(userId);
  if (todayCount >= MAX_GACHA_PER_DAY) {
    const error = new Error(
      'Batas maksimal gacha hari ini (5 kali) telah tercapai.'
    );
    error.statusCode = 429;
    throw error;
  }

  const availablePrizes = await gachaRepository.getAvailablePrizes();
  let roll = Math.random();
  let wonPrize = null;
  const sortedPrizeNames = Object.keys(PRIZE_PROBABILITIES).sort(
    (a, b) => PRIZE_PROBABILITIES[a] - PRIZE_PROBABILITIES[b]
  );

  for (const prizeName of sortedPrizeNames) {
    const probability = PRIZE_PROBABILITIES[prizeName];
    const matchedPrize = availablePrizes.find((p) => p.name === prizeName);
    if (matchedPrize && roll < probability) {
      wonPrize = matchedPrize;
      break;
    }
    roll -= probability;
    if (roll < 0) roll = 0;
  }

  const logData = {
    userId,
    userName,
    isWin: false,
    prize: null,
    prizeName: null,
    gachaDate: new Date(),
  };

  if (wonPrize) {
    const updated = await gachaRepository.decreasePrizeQuota(wonPrize._id);
    if (!updated || updated.remainingQuota < 0) {
      wonPrize = null;
    } else {
      logData.isWin = true;
      logData.prize = wonPrize._id;
      logData.prizeName = wonPrize.name;
    }
  }

  await gachaRepository.saveGachaLog(logData);

  if (logData.isWin) {
    return {
      isWin: true,
      message: `Selamat! Kamu memenangkan ${logData.prizeName}!`,
      prize: logData.prizeName,
      gachaCount: todayCount + 1,
      remainingToday: MAX_GACHA_PER_DAY - (todayCount + 1),
    };
  }

  return {
    isWin: false,
    message: 'Maaf, kamu tidak memenangkan hadiah. Coba lagi!',
    prize: null,
    gachaCount: todayCount + 1,
    remainingToday: MAX_GACHA_PER_DAY - (todayCount + 1),
  };
};

const getUserHistory = async (userId) => {
  const history = await gachaRepository.getUserGachaHistory(userId);
  return history.map((log) => ({
    gachaDate: log.gachaDate,
    isWin: log.isWin,
    prize: log.prizeName || null,
  }));
};

const getPrizeList = async () => {
  const prizes = await gachaRepository.getAllPrizes();
  return prizes.map((p) => ({
    name: p.name,
    quota: p.quota,
    remainingQuota: p.remainingQuota,
    claimed: p.quota - p.remainingQuota,
  }));
};

const getWinnersByPrize = async (prizeName) => {
  const Prize = require('../../../models/prize.model');
  const prize = await Prize.findOne({ name: prizeName });
  if (!prize) {
    const error = new Error('Hadiah tidak ditemukan.');
    error.statusCode = 404;
    throw error;
  }
  const winners = await gachaRepository.getWinnersByPrize(prize._id);
  return {
    prize: prize.name,
    totalWinners: winners.length,
    quota: prize.quota,
    winners: winners.map((w) => ({
      userName: w.userName,
      gachaDate: w.gachaDate,
    })),
  };
};

module.exports = {
  performGacha,
  getUserHistory,
  getPrizeList,
  getWinnersByPrize,
};
