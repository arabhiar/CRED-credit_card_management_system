const rewardService = require('../services/reward');

module.exports = {
    getCoinsCount: async(req, res, next) => {
        rewardService.getCoinsCount(req, res, next)
            .catch(next);
    },
    addRewards: async(req, res, next) => {
        rewardService.addRewards(req, res, next)
            .catch(next)
    },
    getAllRewards: async(req, res, next) => {
        rewardService.getAllRewards(req, res, next)
            .catch(next)
    }
}