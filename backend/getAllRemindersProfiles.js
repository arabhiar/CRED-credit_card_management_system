const db = require('./models');
const calculateOutstandingAmount = require('./services/calculateOutstandingAmount');
const encryptDecrypt = require('./services/encryptDecrypt');

const getAllRemindersProfiles = async() => {
  const data = [];
  await db.Card.findAll({
    where: {},
    attributes: ['id', 'cardNumber']
  })
  .then(async(allCards) => {
    for(const card of allCards) {
      const outstandingAmount = await calculateOutstandingAmount(card.id);
      const currentCardNumber = (card.cardNumber);
      // console.log(currentCardNumber, outstandingAmount);
      if(outstandingAmount > 0) {
        await db.Profile_Card.findAll({
          where: {
            CardId: card.id
          },
          attributes: ['ProfileId']
        })
          .then(async(profileIdAssociated) => {
            for(const profile of profileIdAssociated) {
              await db.Profile.findOne({
                where: {
                  id: profile.ProfileId,
                  reminders: true
                },
                attributes: ['email', 'phoneNumber']
              })
                .then(async(profileInfo) => {
                  data.push({
                    'email': profileInfo.email,
                    'outstandingAmount': outstandingAmount,
                    'phoneNumber': profileInfo.phoneNumber,
                    'cardNumber': await encryptDecrypt.decrypt(currentCardNumber)
                  });
                })
                .catch((err) => {
                  console.log(err);
                })
            }
          })
          .catch((err) => console.log(err));
      }
    }
  })
  
  return data;
}

module.exports = getAllRemindersProfiles;