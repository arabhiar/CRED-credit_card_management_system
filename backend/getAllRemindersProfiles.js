const db = require('./models');
const calculateOutstandingAmount = require('./services/calculateOutstandingAmount');
const encryptDecrypt = require('./services/encryptDecrypt');

const getAllRemindersProfiles = async() => {

  try {
    const data = [];
    const allCards = await db.Card.findAll({
      where: {},
      attributes: ['id', 'cardNumber']
    })
    
    for(const card of allCards) {
      const outstandingAmount = await calculateOutstandingAmount(card.id);
      const currentCardNumber = (card.cardNumber);
      // console.log(currentCardNumber, outstandingAmount);
      if(outstandingAmount > 0) {

        const profileIdAssociated = await db.Profile_Card.findAll({
          where: {
            CardId: card.id
          },
          attributes: ['ProfileId']
        })
        for(const profile of profileIdAssociated) {
          const profileInfo = await db.Profile.findOne({
            where: {
              id: profile.ProfileId,
              reminders: true
            },
            attributes: ['email', 'phoneNumber', 'reminders']
          })
          if(profileInfo.reminders === true) {
            data.push({
              'email': profileInfo.email,
              'outstandingAmount': outstandingAmount,
              'phoneNumber': profileInfo.phoneNumber,
              'cardNumber': await encryptDecrypt.decrypt(currentCardNumber)
            });
          }
        }
      }
    }
    return data;
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = getAllRemindersProfiles;