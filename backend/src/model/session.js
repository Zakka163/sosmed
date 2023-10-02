const { DataTypes } = require('sequelize');
const { sq } = require('../config/connection');
const user = require('./user')
const session = sq.define('session', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING
    },
},
    {
        paranoid: false,
        freezeTableName: true
    }
);

session.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(session, { foreignKey: 'user_id' });

module.exports = session