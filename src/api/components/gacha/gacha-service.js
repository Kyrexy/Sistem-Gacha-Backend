const gachaRepository = require('./gacha-repository');

const LimitGachaHarian = 5;
async function performGacha(userId, userName) {
  const count = await gachaRepository.countUserGachaToday(userId);
  if (count >= LimitGachaHarian) {
    return null;
  }

  const availablePrizes = await gachaRepository.getAvailablePrizes();

  const statusMenang = availablePrizes.length > 0 && Math.random() < 0.5;
  const wonPrize = statusMenang
    ? availablePrizes[Math.floor(Math.random() * availablePrizes.length)]
    : null;

  const logData = {
    userId,
    userName,
    statusMenang: false,
    prize: null,
    prizeName: null,
    gachaDate: new Date(),
  };

  if (wonPrize) {
    const updated = await gachaRepository.decreasePrizeKuota(wonPrize.id);
    if (updated && updated.sisaKuota >= 0) {
      logData.statusMenang = true;
      logData.prize = wonPrize.id;
      logData.prizeName = wonPrize.name;
    }
  }

  await gachaRepository.saveGachaLog(logData);

  return {
    statusMenang: logData.statusMenang,
    prize: logData.prizeName,
    gachaCount: count + 1,
    remainingToday: LimitGachaHarian - (count + 1),
  };
}

async function getUserHistory(userId) {
  const history = await gachaRepository.getUserGachaHistory(userId);
  return history.map((log) => ({
    gachaDate: log.gachaDate,
    statusMenang: log.statusMenang,
    prize: log.prizeName || null,
  }));
}

async function getPrizeList() {
  return gachaRepository.getAllPrizes();
}

async function getWinnersByPrize(prizeName) {
  return gachaRepository.getWinnersByPrizeName(prizeName);
}

module.exports = {
  performGacha,
  getUserHistory,
  getPrizeList,
  getWinnersByPrize,
};
