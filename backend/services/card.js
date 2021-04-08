const db = require('../models');
const encryptDecrypt = require('./encryptDecrypt');
const calculateOutstandingAmount = require('./calculateOutstandingAmount');
const { Op } = require('sequelize');

const daysInMonth = (month, year) => {
    const temp =  new Date(year, month + 1, 0);
    return parseInt(temp.getDate());
}

const updateCoins = (initialCoins, amount) => {
    const today = new Date();
    const currentMonth = parseInt(today.getMonth());
    const currentYear = parseInt(today.getYear());
    const numberOfDays = daysInMonth(currentMonth, currentYear);
    const todayDate = parseInt(today.getDate());

    const daysRemaining = numberOfDays - todayDate;
    const slope = (0.05 / numberOfDays);
    const fraction = slope * daysRemaining;
    const coinsEarned = parseInt(fraction * parseInt(amount));
    const finalCoins = parseInt(initialCoins) + coinsEarned;
    // console.log(currentYear, currentMonth, numberOfDays, todayDate, daysRemaining, slope, fraction, coinsEarned, finalCoins);
    return finalCoins;
}

module.exports = {
    addCard: async(req, res) => { 
        const hashedCardNumber = await encryptDecrypt.encrypt(req.body.cardNumber);

        // we have to check for all the cards
        const userCards = await db.Card.findAll({
            attributes: ['cardNumber', 'cardOwnerName', 'expiryMonth', 'expiryYear', 'id'],
            include: [db.Profile],
        })
        .catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        // if there is not authCode in req
        if(req.body.authCode === undefined) {
            for(const card of userCards) {
                const currentCardNumber = await encryptDecrypt.decrypt(card.cardNumber);

                // if we found the same cardNumber
                if(currentCardNumber === req.body.cardNumber) {
                    for (const profile of card.Profiles) {

                        // if the found card is added by the same user
                        if(req.user.id === profile.UserId) {
                            res.statusCode = 409;
                            throw new Error('Card is Already Added');
                        }   
                    }

                    // if the found card is added by some other user
                    res.statusCode = 422;   
                    throw new Error('You\'re are not authorised to add this card');
                }   
            }

            // now we didn't encounter any card with user input card number, so here we assume the user is legit and we will add the card into db.
            const profileAssociated = await db.Profile.findOne({
                where: {
                    UserId: req.user.id,
                }
            }).catch((err) => {
                res.statusCode = 500;
                throw new Error(err);
            })

            const newCard = await db.Card.create({
                cardOwnerName: req.body.cardOwnerName.toUpperCase(),
                cardNumber: hashedCardNumber,
                expiryMonth: req.body.expiryMonth,
                expiryYear: req.body.expiryYear,
                cvv: req.body.cvv
            }).catch((err) => {
                res.statusCode = 500;
                throw new Error(err);
            })

            newCard.addProfile(profileAssociated);
            res.status(200).send(newCard);
            return;
        }

        // if there is authCode entered while entering the credit card
        else {
            let sameCardNumberExist = false;
            for(const card of userCards) {
                const currentCardNumber = await encryptDecrypt.decrypt(card.cardNumber);

                // we will see if there exist the same cardNumber
                if(currentCardNumber === req.body.cardNumber) {
                    sameCardNumberExist = true;
                    for(const profile of card.Profiles) {

                        // if the same cardNumber is added by the user itself
                        if(profile.UserId === req.user.id) {
                            res.statusCode = 409;
                            throw new Error('Card is Already Added');
                        }
                    }

                    // if the same cardNumber is not added by the input user, we will check for the authCode
                    for(const profile of card.Profiles) {

                        // if the authCode is same of the input user and some other user,
                        if(profile.authCode === null) continue;
                        const decryptedAuthCode = await encryptDecrypt.decrypt(profile.authCode);
                        if(decryptedAuthCode === req.body.authCode) {

                            // we have to also now verify name, and expiry
                            if(card.expiryMonth === req.body.expiryMonth && card.expiryYear === req.body.expiryYear && card.cardOwnerName === req.body.cardOwnerName.toUpperCase()) {

                                // now we can add the card
                                const profileAssociated = await db.Profile.findOne({
                                    where: {
                                        UserId: req.user.id,
                                    }
                                });
                                const cardAssociated = await db.Card.findOne({
                                    where: {
                                        id: card.id,
                                    }
                                });
                                
                                cardAssociated.addProfile(profileAssociated);
                                const outstandingAmount = await calculateOutstandingAmount(cardAssociated.id);
                                cardAssociated.outstandingAmount = outstandingAmount;

                                res.status(200).json(cardAssociated);
                                cardAdded = true;
                                return;
                            }

                            // if the name or expiry is wrong
                            else {
                                res.statusCode = 422;
                                throw new Error('Wrong Card Details or Auth Code!')
                            }
                        }
                    }
                }
            }

            // if same cardNumber exists, but authCode doesn't match
            if(sameCardNumberExist) {
                res.statusCode = 422;
                throw new Error('Wrong Card Details or Auth Code!');
            }
        }

        // this means this is a new card which is not in the db, so we can add this
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id,
            }
        });

        const newCard = await db.Card.create({
            cardOwnerName: req.body.cardOwnerName.toUpperCase(),
            cardNumber: hashedCardNumber,
            expiryMonth: req.body.expiryMonth,
            expiryYear: req.body.expiryYear,
            cvv: req.body.cvv
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        newCard.addProfile(profileAssociated);
        res.status(200).send(newCard);
    },
    getAllCards: async(req, res) => {

        // we have to get cards associated with the current user.
        const userCards = await db.Profile.findAll({
            where: {
                UserId: req.user.id // getting the profile associated with the currentLoggedIn user
            }, 
            include: [db.Card], // getting the card associated with the currentProfile
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })


        let data = [];

        for(const card of userCards[0].Cards) {
            let outstandingAmount = await calculateOutstandingAmount(card.id);
            
            let originalCardNumber = await encryptDecrypt.decrypt(card.cardNumber)
            let cardInfo = {
                id: card.id,
                cardOwnerName: card.cardOwnerName,
                cardNumber: originalCardNumber,
                expiryMonth: card.expiryMonth,
                expiryYear: card.expiryYear,
                outstandingAmount: outstandingAmount,
            }
            data.push(cardInfo);
        }
        res.send(data);
    },
    getCardById: async(req, res) => {

        // finding all the profile associated with that card
        const profileAssociated = await db.Profile_Card.findAll({
            where: {
                CardId: req.params.card_id,
            },
            attributes: ['ProfileId']
        });

        for(const profile of profileAssociated) {
            const profileUser = await db.Profile.findOne({ 
                where: { 
                    id: profile.ProfileId
                },
                attributes: ['UserId']
            });
            if(profileUser.UserId === req.user.id) {
                const card = await db.Card.findOne({
                    where: {
                        id: req.params.card_id,
                    },
                }).catch((err) => {
                    res.statusCode = 500;
                    throw new Error(err);
                })
                const originalCardNumber = await encryptDecrypt.decrypt(card.cardNumber);
                const outstandingAmount = await calculateOutstandingAmount(card.id);
                const cardInfo = {
                    cardOwnerName: card.cardOwnerName,
                    cardNumber: originalCardNumber,
                    expiryMonth: card.expiryMonth,
                    expiryYear: card.expiryYear,
                    outstandingAmount: outstandingAmount,
                }
                res.status(200).send(cardInfo); 
                return;
            }
        }
        res.statusCode = 404;
        throw new Error('Wrong card id or you\'re not authorised !');
    },
    payBill: async(req, res) => {

        // getting the profile associated with the current loggedIn user
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id
            }
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        const coinCount = updateCoins(profileAssociated.coins, req.body.amount);


        const allProfileCardIds = await db.Profile_Card.findAll({
            where: {
                ProfileId: profileAssociated.id
            },
            attributes: ['CardId'] // getting all the cardIds associated with the current loggedIn user profile
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        // we will now check for every card associated with current LoggedIn user,
        for(const profileCardId of allProfileCardIds) {
            const currentUserCard = await db.Card.findOne({
                where: {
                    id: profileCardId.CardId,
                },
                attributes: ['cardNumber']
            }).catch((err) => {
                res.statusCode(500);
                throw new Error(err);
            })

            const currentUserCardNumber = await encryptDecrypt.decrypt(currentUserCard.cardNumber);

            // if we get the same card number associated with the currentLoggedIn user.
            if(req.params.id === currentUserCardNumber) {

                // lets update the rewardsCoin in profile

                const duplicate = {...profileAssociated};
                duplicate.coins = coinCount;
                await profileAssociated.update(duplicate);

                // now we can simply create the new transaction
                const currentTransaction = await db.Transaction.create({
                    amount: req.body.amount,
                    vendor: 'NA',
                    credDeb: true,
                    category: 'NA',
                    cardNumber: currentUserCard.cardNumber,
                    transactionDateTime: Date.now(),
                    CardId: profileCardId.CardId,
                    userAssociated: req.user.email,
                }).catch((err) => {
                    res.statusCode = 500;
                    throw new Error(err);
                })
                res.status(200).send(currentTransaction);
                return;
            }
        }

        res.statusCode = 404;
        throw new Error('Card not found.');
    },

    getStatementsYearMonth: async(req, res) => {
        
        // cardNumber, year, month
        let month = req.params.month;
        let year = req.params.year;
        
        const endingDate = new Date(year, month);

        month = parseInt(month) - 1;

        const startingDate = new Date(year, month);

        // getting the profile associated with the current loggedIn user
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id
            }
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        const allProfileCardIds = await db.Profile_Card.findAll({
            where: {
                ProfileId: profileAssociated.id
            },
            attributes: ['CardId'] // getting all the cardIds associated with the current loggedIn user profile
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        
        // we will now check for every card associated with current LoggedIn user,
        for(const profileCardId of allProfileCardIds) {
            const currentCard = await db.Card.findOne({
                where: {
                    id: profileCardId.CardId,
                },
                attributes: ['cardNumber']
            }).catch((err) => {
                res.statusCode(500);
                throw new Error(err);
            })

            const currentCardNumber = await encryptDecrypt.decrypt(currentCard.cardNumber);

            // if we get the same card number associated with the currentLoggedIn user.
            if(currentCardNumber === req.params.id) {
                const statements = await db.Transaction.findAll({
                    where: {
                        CardId: profileCardId.CardId,
                        transactionDateTime: { // we are now fetching all the statements between the starting and endingDate
                            [Op.gt]: startingDate,
                            [Op.lte]: endingDate,
                        },
                    },
                    attributes: ['transactionId', 'amount', 'vendor', 'credDeb', 'category', 'transactionDateTime', 'userAssociated']
                }).catch((err) => {
                    res.statusCode = 500;
                    throw new Error(err);
                })
            
                statements.sort(function(a, b) {
                    if(a.transactionDateTime > b.transactionDateTime)
                        return 1;
                    if(a.transactionDateTime < b.transactionDateTime)
                        return -1;
                    return 0;
                });
                // Pagination
                statements.reverse();
                const perPage = 10;
                const page = Number(req.query.pageNumber) || 1;
                const count = statements.length;
                const pages = Math.ceil(count / perPage);
                const indexOfLastStatement = page * perPage;
                const indexOfFirstStatement = indexOfLastStatement - perPage;
                const currentStatements = statements.slice(indexOfFirstStatement, indexOfLastStatement);
                res.status(200).json({data: currentStatements, pages, page});
                return;
            }
        }

        res.statusCode = 404;
        throw new Error('Card not found');
    },

    getAllstatements: async(req, res) => {
        // getting the profile associated with the current loggedIn user
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id
            }
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        const allProfileCardIds = await db.Profile_Card.findAll({
            where: {
                ProfileId: profileAssociated.id
            },
            attributes: ['CardId'] // getting all the cardIds associated with the current loggedIn user profile
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        // we will now check for every card associated with current LoggedIn user,
        for(const profileCardId of allProfileCardIds) {
            const currentCard = await db.Card.findOne({
                where: {
                    id: profileCardId.CardId,
                },
                attributes: ['cardNumber']
            }).catch((err) => {
                res.statusCode(500);
                throw new Error(err);
            })

            const currentCardNumber = await encryptDecrypt.decrypt(currentCard.cardNumber);

            // if we get the same card number associated with the currentLoggedIn user.
            if(currentCardNumber === req.params.id) {
                const statements = await db.Transaction.findAll({
                    where: {
                        CardId: profileCardId.CardId,
                    },
                    attributes: ['transactionId', 'amount', 'vendor', 'credDeb', 'category', 'transactionDateTime', 'userAssociated']
                })  
                .catch((err) => {
                    res.statusCode = 500;
                    throw new Error(err);
                })
                statements.sort(function(a, b) {
                    if(a.transactionDateTime > b.transactionDateTime)
                        return 1;
                    if(a.transactionDateTime < b.transactionDateTime)
                        return -1;
                    return 0;
                });
                res.status(200).send(statements);
                return;
            }
        }
        res.statusCode = 404;
        throw new Error('Card not found');
    },
    postStatement: async(req, res) => {

        if(req.body.length === 0) {
            res.statusCode = 500;
            throw new Error('Please enter atleast one statement');
        }

        const currentCardNumber = req.params.id;

        // cardNumber, year, month
        let month = req.params.month;
        let year = req.params.year;

        // 0 indexing month and day
        month = parseInt(month) - 1;
        
        const startingDate = new Date(year, month, 2);


        // finding the cardId associated with the particular cardNumber
        const allCards = await db.Card.findAll({
            where: {

            },
            attributes: ['id', 'cardNumber']
        });
        for(const card of allCards) {
            const decryptedCard = await encryptDecrypt.decrypt(card.cardNumber);
            if(currentCardNumber === decryptedCard) {
                for(const currentStatement of req.body) {
                    await db.Transaction.create({
                        amount: currentStatement.amount,
                        vendor: currentStatement.vendor.toUpperCase(),
                        credDeb: currentStatement.credDeb,
                        category: currentStatement.category.toUpperCase(),
                        cardNumber: card.cardNumber,
                        transactionDateTime: startingDate,
                        CardId: card.id,
                        userAssociated: 'NA',
                    }).catch((err) => {
                        res.statusCode(500);
                        throw new Error(err);
                    })
                }
                res.status(200).send("Statement Posted !");
                return;
            }
        }
        res.statusCode = 500;
        throw new Error(`Invalid card details`);
    },
    getSmartStatementData: async(req, res) => {

        // getting the profile associated with the current loggedIn user
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id
            }
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        const allProfileCardIds = await db.Profile_Card.findAll({
            where: {
                ProfileId: profileAssociated.id
            },
            attributes: ['CardId'] // getting all the cardIds associated with the current loggedIn user profile
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        // we will now check for every card associated with current LoggedIn user,
        for(const profileCardId of allProfileCardIds) {
            const currentCard = await db.Card.findOne({
                where: {
                    id: profileCardId.CardId,
                },
                attributes: ['cardNumber']
            }).catch((err) => {
                res.statusCode(500);
                throw new Error(err);
            })

            const currentCardNumber = await encryptDecrypt.decrypt(currentCard.cardNumber);

            // if we get the same card number associated with the currentLoggedIn user.
            if(currentCardNumber === req.params.id) {
                const allStatements = await db.Transaction.findAll({
                    where: {
                        CardId: profileCardId.CardId,
                    },
                    attributes: ['transactionId', 'amount', 'vendor', 'credDeb', 'category', 'transactionDateTime', 'userAssociated']
                })
                .catch((err) => {
                    res.statusCode = 500;
                    throw new Error(err);
                })
                    
                const allCategories = new Set();
                const allVendors = new Set();

                for(const statement of allStatements) {
                    allCategories.add(statement.category);
                    allVendors.add(statement.vendor);
                }


                let labels = [];
                let data = [];
                for(let currCategory of allCategories) {
                    labels.push(currCategory);
                    let totalAmount = 0;
                    for(let statement of allStatements) {
                        if(statement.category === currCategory) {
                            totalAmount += parseFloat(statement.amount);
                        }
                    }
                    data.push(totalAmount);
                }

                
                const categories = {
                    labels: [...labels],
                    data: [...data]
                };

                labels = [];
                data = [];

                for(let currVendor of allVendors) {
                    labels.push(currVendor);
                    let totalAmount = 0;
                    for(let statement of allStatements) {
                        if(statement.vendor === currVendor) {
                            totalAmount += parseFloat(statement.amount);
                        }
                    }
                    data.push(totalAmount);
                }

                const vendors = {
                    labels: [...labels],
                    data: [...data]
                }

                const smartStatement = {
                    categories: categories,
                    vendors: vendors
                }

                res.send(smartStatement);
                return;
            }
        }
        res.statusCode = 404;   
        throw new Error('Card not found');
    },
    getSmartStatementYearMonth: async(req, res) => {
        // cardNumber, year, month
        let month = req.params.month;
        let year = req.params.year;
        
        const endingDate = new Date(year, month);

        month = parseInt(month) - 1;

        const startingDate = new Date(year, month);

        // getting the profile associated with the current loggedIn user
        const profileAssociated = await db.Profile.findOne({
            where: {
                UserId: req.user.id
            }
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        const allProfileCardIds = await db.Profile_Card.findAll({
            where: {
                ProfileId: profileAssociated.id
            },
            attributes: ['CardId'] // getting all the cardIds associated with the current loggedIn user profile
        }).catch((err) => {
            res.statusCode = 500;
            throw new Error(err);
        })

        // we will now check for every card associated with current LoggedIn user,
        for(const profileCardId of allProfileCardIds) {
            const currentCard = await db.Card.findOne({
                where: {
                    id: profileCardId.CardId,
                },
                attributes: ['cardNumber']
            }).catch((err) => {
                res.statusCode(500);
                throw new Error(err);
            })

            const currentCardNumber = await encryptDecrypt.decrypt(currentCard.cardNumber);

            // if we get the same card number associated with the currentLoggedIn user.
            if(currentCardNumber === req.params.id) {
                const allStatements = await db.Transaction.findAll({
                    where: {
                        CardId: profileCardId.CardId,
                        transactionDateTime: { // we are now fetching all the statements between the starting and endingDate
                            [Op.gt]: startingDate,
                            [Op.lte]: endingDate,
                        },
                    },
                    attributes: ['transactionId', 'amount', 'vendor', 'credDeb', 'category', 'transactionDateTime', 'userAssociated']
                })  
                    .catch((err) => {
                        res.statusCode = 500;
                        throw new Error(err);
                    })
                const allCategories = new Set();
                const allVendors = new Set();

                for(const statement of allStatements) {
                    allCategories.add(statement.category);
                    allVendors.add(statement.vendor);
                }


                let labels = [];
                let data = [];
                let count = [];
                for(let currCategory of allCategories) {
                    labels.push(currCategory);
                    let totalAmount = 0;
                    let currentCount = 0;
                    for(let statement of allStatements) {
                        if(statement.category === currCategory) {
                            totalAmount += parseFloat(statement.amount);
                            currentCount += 1;
                        }
                    }
                    data.push(totalAmount);
                    count.push(currentCount);
                }
                
                const categories = {
                    labels: [...labels],
                    data: [...data]
                };

                const categoriesCount = {
                    labels: [...labels],
                    data: [...count]
                }

                labels = [];
                data = [];
                count = [];

                for(let currVendor of allVendors) {
                    labels.push(currVendor);
                    let totalAmount = 0;
                    let currentCount = 0;
                    for(let statement of allStatements) {
                        if(statement.vendor === currVendor) {
                            totalAmount += parseFloat(statement.amount);
                            currentCount += 1;
                        }
                    }
                    data.push(totalAmount);
                    count.push(currentCount);
                }

                const vendors = {
                    labels: [...labels],
                    data: [...data]
                }

                const vendorsCount = {
                    labels: [...labels],
                    data: [...count]
                }

                const smartStatement = {
                    categories: categories,
                    vendors: vendors,
                    categoriesCount: categoriesCount,
                    vendorsCount: vendorsCount
                }
                res.send(smartStatement);
                return;
            }
        }
        res.statusCode = 404;   
        throw new Error('Card not found');
    }
}