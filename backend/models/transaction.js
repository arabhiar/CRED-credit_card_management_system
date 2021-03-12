'use strict';

module.exports = (sequelize, DataTypes) => {
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
        transactionMonth: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        transactionYear: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    })

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
        })
        Transaction.belongsTo(models.Card, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Transaction;
}