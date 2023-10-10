const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');
const message = require('./message')
const user = require('./user')

const message_sub = sq.define('message_sub', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
},
    {
        paranoid: true,
        freezeTableName: true
    }
);

message_sub.belongsTo(message, { foreignKey: 'message_id' });
message.hasMany(message_sub, { foreignKey: 'message_id' });

message_sub.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(message_sub, { foreignKey: 'user_id' });

module.exports = message_sub