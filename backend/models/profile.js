'use strict';
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authCode: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        reminders: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        phoneNumber: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        coins: {
            allowNull: false,
            type: DataTypes.DECIMAL(10, 2),
            defaullt: 0
        }
    });

    Profile.associate = models => {
        Profile.belongsToMany(models.Card, {
            through: 'Profile_Card'
        });
        Profile.belongsTo(models.User, {
            foreignKey: {
                alowNull: false
            }
        })
    }

    return Profile;
}