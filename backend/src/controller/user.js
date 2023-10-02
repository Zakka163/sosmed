const { Op, where } = require('sequelize')
const {sq} = require('../config/connection')
const { nanoid } = require('nanoid')
const bcrypt = require('../helper/bcrypt')
const moment = require('moment')
const type = require('../helper/type')
const user_m = require('../model/user')
const jwt = require('../helper/jwt')
const session_m = require('../model/session')


class Controller{
	static async register(req,res){
		const { username,password,first_name,middle_name,last_name,phone,email,last_login,intro,profile } = req.body

		try{
			let match = await sq.query(`select * from "user" u where u.username = :username or u.email = :email and "deletedAt" isnull`,type({username,email}))
			
			let is_data_already = match.length > 0
			if (is_data_already) {
				res.status(500).json({ status: 500, message: "data already exist"})
			}else{
				let hash_pass = bcrypt.hashPassword(password)
				const result = await user_m.create({ id:nanoid(20),username:`${username}`,password:`${hash_pass}`,first_name:`${first_name}`,middle_name:`${middle_name}`,last_name:`${last_name}`,phone:`${phone}`,email:`${email}`,last_login,intro:`${intro}`,profile:`${profile}` })
	            res.status(200).json({ status: 200, message: "success", data:result })
			}
		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}

	static async list_user(req,res){
		const { username,password,first_name,middle_name,last_name,phone,email,last_login,intro,profile } = req.body

		try{
			let data_user = await sq.query(`select * from "user" `)
			let amount = await sq.query(`select count(*) as "amount" from "user" `)

            res.status(200).json({ status: 200, message: "success", data:data_user[0] })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}
	static async login(req,res){
		const { username,password,email } = req.body

		try{
			let replace = ''
			if(!username && !email ) return res.status(200).json({ status: 500, message: "empty email and userename "}) 
			let data_user = await sq.query(`select * from "user" where username = :username or email = :email`,type({username,email}))

			if(data_user.length < 1){ return res.status(200).json({ status: 500, message: "missing username or email" }) }

			let hash_pass = data[0].password
			let is_match = bcrypt.compare(password,hash_pass) 

			if(!is_match){ return res.status(200).json({ status: 500, message: "wrong password"}) }

			const check_login = await sq.query(`select * from "session" s join "user" u on u.id = s.user_id where s.user_id = :id`,type({id:`${data[0].id}`}))
		
			if (check_login.length > 0) {return res.status(201).json({ status: 204, message: "already logged in"})}
			let token = jwt.generateToken({id:data[0].id})
			await sq.transaction(async (t)=>{
				let time = moment().format('YYYY-MM-DD')
				await user_m.update({last_login:time},{ where:{ id:data[0].id } },{ transaction: t })
				const session = await session_m.create({id:nanoid(10),token,user_id:data[0].id},{ transaction: t })
				const session_token = jwt.generateToken({id:session.id})
		        res.status(200).json({ status: 200, message: "success",token:session_token })
			})
			

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}
	static async delete(req,res){
		const { id } = req.params.id

		try{
			console.log(id);
			await user_m.destroy({where:{id}})
            res.status(200).json({ status: 200, message: "success" })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}
	static async token(req,res){
		const { token } = req.body

		try{
			let data = jwt.verifyToken(token)
			
            res.status(200).json({ status: 200, message: "success",data })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}
	static async logout(req,res){
		const { id } = req.params

		try{
			await session_m.destroy({where:{id}})
			
            res.status(200).json({ status: 200, message: "success",data })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
	}
}


module.exports = Controller