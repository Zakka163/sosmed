const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');
const user = require('./user')

const message = sq.define('message', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    last_message: {
        type: DataTypes.TEXT
    },
    last_sent_user:{
        type: DataTypes.STRING
    }

},
    {
        paranoid: true,
        freezeTableName: true
    }
);

message.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(message, { foreignKey: 'user_id' });



module.exports = message