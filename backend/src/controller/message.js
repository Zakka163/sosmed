const type = require('../helper/type.js')
const { sq } = require('../config/connection.js')
const message_m = require('../model/message')
const message_pool_m = require('../model/message_pool')
const message_sub_m = require('../model/message_sub')

const { nanoid } = require('nanoid')
const moment = require('moment')





const list_message = async (req, res) => {
	const { total, page, user_id, last_message, last_sent_user } = req.body
	try {
		let value = ''
		let value2 = ''
		if (user_id) {
			value2 += ` and ms.user_id_1 = :user_id or ms.user_id_2 = :user_id`
		}
		if (last_sent_user) {
			value2 += ` and m.last_sent_user = :last_sent_user`
		}
		if (last_message) {
			value2 += ` and m.last_message = :last_message`
		}
		if (page && total) {
			value += ` offset :offset limit :total`
		}
		let data_message = await sq.query(`select m.id as "m_id",ms.id as "ms_id",u.username as u_1_username,u2.username as u_2_username ,* 
        from message m 
		join message_sub ms on ms.message_id = m.id
		left join "user" u on u.id = ms.user_id_1 
		left join "user" u2 on u2.id = ms.user_id_2  
        where m."deletedAt" isnull  ${value2} order by m."createdAt" desc ${value}`,
			type({
				user_id: `${user_id}`,
				last_message: `${last_message}`,
				last_sent_user: `${last_sent_user}`,
				offset: (+page * total), total: total
			}))
		if (page && total) {
			let jml = await sq.query(`select count(*)as "total" from message m 
		join message_sub ms on ms.message_id = m.id
		left join "user" u on u.id = ms.user_id_1 
		left join "user" u2 on u2.id = ms.user_id_2  
        where m."deletedAt" isnull  ${value2} `,
				type({
					user_id: `${user_id}`,
					last_message: `${last_message}`,
					last_sent_user: `${last_sent_user}`
				}))
			res.status(200).json({ status: 200, message: "succes", data_message, count: jml[0].total, total, page })
		} else {
			res.status(200).json({ status: 200, message: "succes", data_message })
		}
	}
	catch (err) {
		console.log(req.body)
		console.log(err)
		res.status(500).json({ status: 500, message: "failed", data: err })
	}
}

const list_by_message = async (req, res) => {
	const { total, page, message_id, to_user_id, from_user_id, message_value } = req.body

	try {
		let value = ''
		let value2 = ''
		if (message_id) {
			value2 += ` and mp.message_id = :message_id`
		}
		if (to_user_id) {
			value2 += `and  mp.to_user_id = :to_user_id`
		}
		if (from_user_id) {
			value2 += ` and mp.from_user_id = :from_user_id`
		}
		if (message_value) {
			value2 += ` and mp.message_value ilike :message_value`
		}
		if (page && total) {
			value += ` offset :offset limit :total`
		}
		let data_message = await sq.query(`select mp.id as "mp_id",m.id as "m_id",* from message_pool mp 
		join message m on m.id = mp.message_id   ${value2} order by mp."createdAt" desc ${value}`,
			type({
				message_id: `${message_id}`,
				from_user_id: `${from_user_id}`,
				to_user_id: `${to_user_id}`,
				message_value: `%${message_value}%`,
				offset: (+page * total), total: total
			}))
		if (page && total) {
			let jml = await sq.query(`select count(*) as "total" from message_pool mp 
			join message m on m.id = mp.message_id  ${value2} `,
				type({
					message_id: `${message_id}`,
					from_user_id: `${from_user_id}`,
					to_user_id: `${to_user_id}`,
					message_value: `%${message_value}%`
				}))
			res.status(200).json({ status: 200, message: "succes", data_message, count: jml[0].total, total, page })
		} else {
			res.status(200).json({ status: 200, message: "succes", data_message })
		}
	}
	catch (err) {
		console.log(req.body)
		console.log(err)
		res.status(500).json({ status: 500, message: "failed", data: err })
	}
}

const send_message = async (req, res) => {
	const { message_id, to_user_id, from_user_id, message_value, last_message, last_sent_user } = req.body
	try {

		if (!message_id) {
			const data = await sq.transaction(async (t) => {
				let result_message = await message_m.create({ id: nanoid(14), last_message, last_sent_user }, { transaction: t })
				let result_message_sub = await message_sub_m.create({ id: nanoid(14), message_id: result_message.id, user_id_1: from_user_id, user_id_2: to_user_id }, { transaction: t })
				let result_message_pool = await message_pool_m.create({ id: nanoid(14), message_id: result_message.id, to_user_id, from_user_id, message_value }, { transaction: t })
				return {
					result_message,
					result_message_pool,
					result_message_sub
				}


			})
			res.status(200).json({ status: 200, message: "success", data })
		} else {
			let result_message_pool = await message_pool_m.create({ id: nanoid(14), message_id, to_user_id, from_user_id, message_value })
			res.status(200).json({ status: 200, message: "success", data: result_message_pool })
		}

	}
	catch (err) {
		console.log(req.body)
		console.log(err)
		res.status(500).json({ status: 500, message: "failed", data: err })
	}
}

const update_message = async (req, res) => {
	const { id, last_message, last_sent_user, user_id } = req.body
	try {
		const data = await message_m.update({ last_message, last_sent_user }, { where: { id } })
		res.status(200).json({ status: 200, message: "success", data })

	}
	catch (err) {
		console.log(req.body)
		console.log(err)
		res.status(500).json({ status: 500, message: "failed", data: err })
	}
}

const delete_message = async (req, res) => {
	const { id } = req.params
	try {
		await message_m.destroy({ where: { id } })
		res.status(200).json({ status: 200, message: "success" })

	}
	catch (err) {
		console.log(req.body)
		console.log(err)
		res.status(500).json({ status: 500, message: "failed", data: err })
	}
}

const detail_message = async (req, res) => {
	const { id } = req.params
	try {
		let data = await sq.query(`select m.id as "m_id",* from "message" as m 
				join message_sub ms on ms.message_id = m.id
				where m.id = :id`, type({ id }))
		console.log(data)
		// let amount = await sq.query(`select count(*) as "amount" from "user" `)

		res.status(200).json({ status: 200, message: "success", data })
	}
	catch (err) {
		console.log(err)
	}
}


module.exports = {
	list_message,
	list_by_message,
	send_message,
	update_message,
	delete_message,
	detail_message
}