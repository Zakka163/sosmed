const { QueryTypes, Op } = require('sequelize');

function tipe( data ) {
	return { replacements:data, type: QueryTypes.SELECT };
}

module.exports = tipe