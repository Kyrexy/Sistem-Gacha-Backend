const express = require('express');
const gachaController = require('./gacha-controller');

module.exports = (app) => {
  const router = express.Router();
  app.use('/gacha', router);

  router.post('/', gachaController.doGacha);
  router.get('/history/:userId', gachaController.getUserHistory);
  router.get('/prizes', gachaController.getPrizeList);
  router.get('/winners/:prizeName', gachaController.getWinnersByPrize);
};
