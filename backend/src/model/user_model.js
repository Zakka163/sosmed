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
    role: {
        type: DataTypes.STRING
    },
    nama: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    },
    nip: {
        type: DataTypes.STRING
    },
    nik: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: true,
        freezeTableName: true
    }
);


module.exports = user