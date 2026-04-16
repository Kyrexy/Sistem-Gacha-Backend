const gachaService = require('./gacha-service');

const doGacha = async (request, response) => {
  const { userId, userName } = request.body;

  if (!userId || !userName) {
    return response.status(400).json({
      status: 'error',
      message: 'userId dan userName gabole kosong',
    });
  }

  const result = await gachaService.performGacha(userId, userName);

  if (result === null) {
    return response.status(400).json({
      status: 'error',
      message: 'Limit gacha harian anda sudah habis!',
    });
  }

  if (result.statusMenang === false) {
    return response.status(200).json({
      status: 'success',
      message: 'Gacha (1x)',
      detail: 'Anda kurang hoki coba lagi!',
      data: result,
    });
  }

  return response.status(200).json({
    status: 'success',
    message: 'Gacha (1x)',
    detail: `Anda Hoki! Anda menang ${result.prize}!`,
    data: result,
  });
};

const getUserHistory = async (request, response) => {
  const { userId } = request.params;

  const history = await gachaService.getUserHistory(userId);

  return response.status(200).json({
    status: 'success',
    data: {
      userId,
      totalGacha: history.length,
      history,
    },
  });
};

const getPrizeList = async (request, response) => {
  const prizes = await gachaService.getPrizeList();

  return response.status(200).json({
    status: 'success',
    data: prizes,
  });
};

const getWinnersByPrize = async (request, response) => {
  const { prizeName } = request.params;

  const result = await gachaService.getWinnersByPrize(
    decodeURIComponent(prizeName)
  );

  return response.status(200).json({
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
