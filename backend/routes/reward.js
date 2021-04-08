const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/reward');
const verifyToken = require('../middlewares/verifyToken');
const rewardSchema = require('../schemas/rewardSchema');

router.post('/', [verifyToken(), rewardSchema], rewardController.addRewards);
router.get('/', [verifyToken()], rewardController.getAllRewards);
router.get('/coins', [verifyToken()], rewardController.getCoinsCount);


module.exports = router;