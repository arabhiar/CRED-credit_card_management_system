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
    });

    Card.associate = (models) => {
        Card.belongsTo(models.User, {
            foreignKey: {
                alowNull: false
            }
        });
        Card.hasMany(models.Transaction, {
            onDelete: 'cascade'
        });
    }
    return Card;
}