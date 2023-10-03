const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');
const user = require('./user')
const user_auth = sq.define('user_auth', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    refresh_token: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: false,
        freezeTableName: true
    }
);

user_auth.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(user_auth, { foreignKey: 'user_id' });

module.exports = user_auth