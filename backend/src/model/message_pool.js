const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');
const to_user = require('./user')
const from_user = require('./user')
const message = require('./message')


const message_pool = sq.define('message_pool', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    message_value: {
        type: DataTypes.TEXT
    },
},
    {
        paranoid: true,
        freezeTableName: true
    }
);

message_pool.belongsTo(to_user, { foreignKey: 'to_user_id' });
to_user.hasMany(message_pool, { foreignKey: 'to_user_id' });

message_pool.belongsTo(from_user, { foreignKey: 'from_user_id' });
from_user.hasMany(message_pool, { foreignKey: 'from_user_id' });

message_pool.belongsTo(message, { foreignKey: 'message_id' });
message.hasMany(message_pool, { foreignKey: 'message_id' });


module.exports = message_pool