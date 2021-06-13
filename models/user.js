'use strict';
const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

// Remember id, created_date, updated_date columns are created for you.
User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created/updated, we will automatically hash their password
        hooks: {
            beforeCreate(user) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                return user;
            },
            beforeUpdate(user) {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                }
                return user;
            },
        },
        sequelize,
        modelName: 'user',
    }
);

module.exports = User;
