const db = require("../models")
const crypto = require('crypto')

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') 
        .slice(0,len).toUpperCase();  
}

module.exports = {
    getCoinsCount: async(req, res, next) => {
        // getProfileAssociated
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id
            },
            attributes: ['coins']
        })
        .catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })
        res.status(200).json({ coinsCount: profileAssociated.coins });
    },
    addRewards: async(req, res, next) => {
        try {
            // getProfileAssociated
            const profileAssociated = await db.Profile.findOne({
                where: {
                    UserId: req.user.id
                },
                attributes: ['id', 'email', 'authCode', 'UserId', 'name', 'phoneNumber', 'reminders', 'coins']
            })

            const duplicate = {...profileAssociated};
            duplicate.coins = parseInt(profileAssociated.coins) - parseInt(req.body.coinsNeeded);

            const couponPromoCode = randomValueHex(4) + "-" + randomValueHex(4) + "-" + randomValueHex(4);

            await db.Reward.create({
                couponId: req.body.couponId,
                companyName: req.body.companyName,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                promocode: couponPromoCode,
                coinsNeeded: req.body.coinsNeeded,
                ProfileId: profileAssociated.id
            })

            await profileAssociated.update(duplicate);

            res.status(200).json({ msg: "Reward Added Successfully !"});
        } catch(error) {
            res.statusCode = 500;
            throw new Error(error);
        }
    },
    getAllRewards: async(req, res, next) => {
        try {
            // getProfileAssociated
            const profileAssociated = await db.Profile.findOne({
                where: {
                    UserId: req.user.id
                },
                attributes: ['id']
            });

            const allRewards = await db.Reward.findAll({
                where: {
                    ProfileId: profileAssociated.id
                },
                attributes: ['id', 'couponId', 'companyName', 'description', 'imageUrl', 'promocode', 'coinsNeeded']
            })

            res.status(200).send(allRewards);
        }
        catch(error) {
            res.statusCode = 500;
            throw new Error(error);
        }
    }
}