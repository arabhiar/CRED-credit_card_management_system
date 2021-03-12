'use strict';
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        name: {
            allowNull: false,
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
        }
    });

    Profile.associate = models => {
        Profile.belongsTo(models.User, {
            foreignKey: {
                alowNull: false
            }
        })
    }

    return Profile;
}