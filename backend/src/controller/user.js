const { Op, where } = require('sequelize')
const { sq } = require('../config/connection')
const { nanoid } = require('nanoid')
const bcrypt = require('../helper/bcrypt')
const moment = require('moment')
const type = require('../helper/type')
const user_m = require('../model/user')
const jwt = require('../helper/jwt')
const { sendOTP } = require('../helper/otp')
const user_auth_m = require('../model/user_auth')


class Controller {
	static async register(req, res, next) {
		const { username, password, first_name, middle_name, last_name, phone, email, last_login, intro, profile } = req.body

		try {
			let match = await sq.query(`select * from "user" u where u.username = :username or u.email = :email and "deletedAt" isnull`, type({ username, email }))

			let is_data_already = match.length > 0
			if (is_data_already) throw new Error('username or email already exist')
			else {
				let hash_pass = bcrypt.hashPassword(password)
				const result = await user_m.create({ id: nanoid(20), username: `${username}`, password: `${hash_pass}`, first_name: `${first_name}`, middle_name: `${middle_name}`, last_name: `${last_name}`, phone: `${phone}`, email: `${email}`, last_login, intro: `${intro}`, profile: `${profile}` })
				// console.log(result.id)
				res.status(200).json({ status: 200, message: "success", data: result })
			}
		}
		catch (err) {
			next(err)
		}
	}

	static async login(req, res, next) {
		const { username, password, email } = req.body

		try {
			let replace = ''
			console.log(email)
			if (email) {
				replace += `email = '${email}' `
			}
			if (username) {
				replace += ` or username = :username`
			}
			if (!username && !email) return res.status(200).json({ status: 500, message: "empty email and userename " })
			let data_user = await sq.query(`select * from "user" where  ${replace}`, type({ username, email }))
			console.log(data_user)
			// let is_verified_email = data_user[0].is_verified_email
			// if (!is_verified_email) { return res.status(200).json({ status: 500, message: "email has not been verified" }) }
			if (data_user.length < 1) throw new Error(`username or email doesn't exist`)
			let hash_pass = data_user[0].password
			let is_match = bcrypt.compare(password, hash_pass)

			if (!is_match) throw new Error('wrong password')

			// const check_login = await sq.query(`select * from user_auth ua join "user" u on u.id = ua.user_id where ua.user_id = :id and ua."deletedAt" isnull`, type({ id: `${data_user[0].id}` }))

			// if (check_login.length > 0) throw new Error('already logged in') 
			let token = jwt.generateToken({ id: data_user[0].id })
			await sq.transaction(async (t) => {
				let time = moment()
				await user_m.update({ last_login: time }, { where: { id: data_user[0].id } }, { transaction: t })
				const refresh_token = await user_auth_m.create({ id: nanoid(10), refresh_token: token, user_id: data_user[0].id }, { transaction: t })
				const acces_token = jwt.generateToken({ id: refresh_token.id })
				res.status(200).json({ status: 200, message: "success", refresh_token, acces_token })
			})
		}
		catch (err) {
			next(err)
		}
	}
	static async logout(req, res, next) {
		const { user_id } = req.body
		try {
			// console.log(id)
			await user_auth_m.destroy({ where: { user_id } })
			res.status(200).json({ status: 200, message: "success" })
		}
		catch (err) {
			next(err)
		}
	}

	static async list_user(req, res) {
		const { username, password, first_name, middle_name, last_name, phone, email, last_login, intro, profile } = req.body
		try {
			let data_user = await sq.query(`select * from "user" `)
			let amount = await sq.query(`select count(*) as "amount" from "user" `)

			res.status(200).json({ status: 200, message: "success", data: data_user[0] })
		}
		catch (err) {
			next(err)
		}
	}
	static async user_by_id(req, res) {
		const { user_id } = req.body
		try {
			let data = await sq.query(`select * from "user" as u where u.id = :id`, type({ id: user_id }))
			// console.log(data)
			// let amount = await sq.query(`select count(*) as "amount" from "user" `)

			res.status(200).json({ status: 200, message: "success", data })
		}
		catch (err) {
			console.log(err)
		}
	}
	static async delete(req, res) {
		const { id } = req.params.id

		try {
			console.log(id);
			await user_m.destroy({ where: { id } })
			res.status(200).json({ status: 200, message: "success" })
		}
		catch (err) {
			console.log(req.body)
			console.log(err)
			res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}

}


module.exports = Controller