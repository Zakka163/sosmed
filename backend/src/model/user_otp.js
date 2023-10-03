const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');
const user = require('./user')
const user_otp = sq.define('user_otp', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    otp: {
        type: DataTypes.STRING
    },
    expiration_time: {
        type: DataTypes.DATE
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},
    {
        paranoid: false,
        freezeTableName: true
    }
);

user_otp.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(user_otp, { foreignKey: 'user_id' });

module.exports = user_otp