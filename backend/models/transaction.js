'use strict';

module.exports = (sequelize, DataTypes) => {
    const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize, { warnings: false });
    const Transaction = sequelize.define('Transaction', {
        transactionId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        vendor: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        credDeb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        cardNumber: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        transactionDateTime: {
            allowNull: false,
            type: TIMESTAMP
        },
        userAssociated: {
            type: DataTypes.STRING
        }
    })

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Card, { 
            foreignKey: {
                allowNull: false,
            }
        })
    }

    return Transaction;
}