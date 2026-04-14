const mongoose = require('mongoose');
const NameHider = require('../../../utils/NameHider');

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

const getAvailablePrizes = async () => Prize.find({ sisaKuota: { $gt: 0 } });

const getAllPrizes = async () => Prize.find();

const decreasePrizeKuota = async (prizeId) =>
  Prize.findByIdAndUpdate(prizeId, { $inc: { sisaKuota: -1 } }, { new: true });

const saveGachaLog = async (data) => {
  const log = new GachaLog(data);
  return log.save();
};

const getUserGachaHistory = async (userId) =>
  GachaLog.find({ userId }).sort({ gachaDate: -1 }).populate('prize');

const getWinnersByPrize = async (prizeId) => {
  const winners = await GachaLog.find({
    prize: prizeId,
    statusMenang: true,
  }).sort({
    gachaDate: -1,
  });
  return winners.map((w) => ({
    ...w.toObject(),
    userName: NameHider(w.userName),
  }));
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
