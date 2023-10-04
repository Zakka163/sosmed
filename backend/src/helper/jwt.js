const jwt = require('jsonwebtoken')

function generateToken(payload) {
	return jwt.sign(payload, 'sosmed')
}

function verifyToken(token) {
	return jwt.verify(token, 'sosmed')
}

module.exports = {
	generateToken,
	verifyToken
}