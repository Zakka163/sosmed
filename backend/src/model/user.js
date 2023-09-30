const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');

const user = sq.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    middle_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    last_login: {
        type: DataTypes.DATE
    },
    intro: {
        type: DataTypes.TEXT
    },
    profile: {
        type: DataTypes.TEXT
    },
},
    {
        paranoid: true,
        freezeTableName: true
    }
);


module.exports = user