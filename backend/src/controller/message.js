const type = require('../helper/type.js')
const { sq } = require('../config/connection.js')
const message_m = require('../model/message')
const message_pool_m = require('../model/message_pool')
const message_sub_m = require('../model/message_sub')

const { nanoid } = require('nanoid')
const moment = require('moment')





const list = async (req, res) => {
	const { total,page,user_id } = req.body
	try {
		let value = ''
		if (page && total) {
			value += ` offset :offset limit :total` }
        let data_message = await sq.query(`select * from "message" as m where m.user_id = :user_id and m."deletedAt" isnull  order by m."createdAt" desc ${value}`,type({ user_id:`${user_id}`,offset: (+page * total), total: total }))
        if (page && total) {
            let jml = await sq.query(`select count(*)as "total" from "message" as m where m.user_id = :user_id and m."deletedAt" isnull`,type({user_id:`${user_id}`}))
            res.status(200).json({ status: 200, message: "succes", data_message, count: jml[0].total, total, page})
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

const create_message = async(req,res) => {
	const { total,page,user_id } = req.body
	try {
		let value = ''
		if (page && total) {
			value += ` offset :offset limit :total` }
        let data_message = await sq.query(`select * from "message" as m where m.user_id = :user_id and m."deletedAt" isnull  order by m."createdAt" desc ${value}`,type({ user_id:`${user_id}`,offset: (+page * total), total: total }))
        if (page && total) {
            let jml = await sq.query(`select count(*)as "total" from "message" as m where m.user_id = :user_id and m."deletedAt" isnull`,type({user_id:`${user_id}`}))
            res.status(200).json({ status: 200, message: "succes", data_message, count: jml[0].total, total, page})
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




module.exports = {
	list,create_message
}