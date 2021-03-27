'use strict';
const options = {
    defaultScope: {
        // exclude password by default
        attributes: { exclude: ['password']}
    },
    scopes: {
        // include password with this scope
        withPassword: { attributes: {}, }
    }
}
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, options)

    User.associate = models => {
        User.hasOne(models.Profile), {
            onDelete: "cascade"
        }
    }

    return User;
}