const mongoose = require('mongoose');

const GachaLog = mongoose.model('GachaLog');
const Prize = mongoose.model('Prize');

const countUserGachaToday = async (userId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return GachaLog.countDocuments({
    userId,
    gachaDate: { $gte: startOfDay, $lte: endOfDay },
  });
};

const getAvailablePrizes = async () =>
  Prize.find({ sisaKuota: { $gt: 0 } });

const getAllPrizes = async () => Prize.find();

const decreasePrizeKuota = async (prizeId) =>
  Prize.findByIdAndUpdate(
    prizeId,
    { $inc: { sisaKuota: -1 } },
    { new: true }
  );

const saveGachaLog = async (data) => {
  const log = new GachaLog(data);
  return log.save();
};

const getUserGachaHistory = async (userId) =>
  GachaLog.find({ userId }).sort({ gachaDate: -1 }).populate('prize');

const getWinnersByPrize = async (prizeId) => {
  const winners = await GachaLog.find({ prize: prizeId, isWin: true }).sort({
    gachaDate: -1,
  });
  return winners.map((w) => ({
    ...w.toObject(),
    userName: maskName(w.userName),
  }));
};

const maskName = (name) => {
  const parts = name.trim().split(' ');
  const style = Math.random() < 0.5 ? 1 : 2;

  return parts
    .map((part, index) => {
      if (part.length === 0) return part;
      if (style === 1) {
        if (index === parts.length - 1 && parts.length > 1) return part;
        return part[0] + '*'.repeat(part.length - 1);
      }
      if (part.length <= 2) return part[0] + '*'.repeat(part.length - 1);
      return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
    })
    .join(' ');
};

module.exports = {
  countUserGachaToday,
  getAvailablePrizes,
  getAllPrizes,
  decreasePrizeKuota,
  saveGachaLog,
  getUserGachaHistory,
  getWinnersByPrize,
};
