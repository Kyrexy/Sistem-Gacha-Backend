const gachaService = require('./gacha-service');

const doGacha = async (req, res) => {
  const { userId, userName } = req.body;

  if (!userId || !userName) {
    return res.status(400).json({
      status: 'error',
      message: 'userId dan userName gabole kosong.',
    });
  }

  const result = await gachaService.performGacha({ userId, userName });

  return res.status(200).json({
    status: 'success',
    data: result,
  });
};

const getUserHistory = async (req, res) => {
  const { userId } = req.params;

  const history = await gachaService.getUserHistory(userId);

  return res.status(200).json({
    status: 'success',
    data: {
      userId,
      totalGacha: history.length,
      history,
    },
  });
};

const getPrizeList = async (req, res) => {
  const prizes = await gachaService.getPrizeList();

  return res.status(200).json({
    status: 'success',
    data: prizes,
  });
};

const getWinnersByPrize = async (req, res) => {
  const { prizeName } = req.params;

  const result = await gachaService.getWinnersByPrize(
    decodeURIComponent(prizeName)
  );

  return res.status(200).json({
    status: 'success',
    data: result,
  });
};

module.exports = {
  doGacha,
  getUserHistory,
  getPrizeList,
  getWinnersByPrize,
};
