'use strict';

module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
        id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        cardOwnerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardNumber: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        outstandingAmount: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00,
        },
        expiryMonth: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 12,
                isInt: true,
            }
        },
        expiryYear: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                min: 2021,
                max: 3000,
                isInt: true,
            }
        },
        cvv: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                min:100,
                max:9999,
                isInt: true,
            }
        }
    });

    Card.associate = (models) => {
        Card.belongsToMany(models.Profile, { through: 'Profile_Card' });
        Card.hasMany(models.Transaction, { // one card can have many transactions
            onDelete: 'cascade'
        });
    }
    return Card;
}