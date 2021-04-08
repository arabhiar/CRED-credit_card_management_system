'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reward = sequelize.define('Reward', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        couponId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        promocode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coinsNeeded: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Reward.associate = (models) => {
        Reward.belongsTo(models.Profile, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Reward;
}