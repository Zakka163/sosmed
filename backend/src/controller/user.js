const { Op, where } = require('sequelize')
const {sq} = require('../config/connection')
const { nanoid } = require('nanoid')
const bcrypt = require('../helper/bcrypt')
const moment = require('moment')
const type = require('../helper/type')
const user_m = require('../model/user')
const jwt = require('../helper/jwt')
const user = require('../model/user')


class Controller{
	static async register(req,res){
		const { username,password,first_name,middle_name,last_name,phone,email,last_login,intro,profile } = req.body

		try{
			let match = await sq.query(`select * from "user" u where u.username = :username or u.email = :email and "deletedAt" isnull`,type({username,email}))
			// console.log(match.length)
			if (match.length > 0) {
				res.status(500).json({ status: 500, message: "data sudah ada"})
			}else{
				let hash_pass = bcrypt.hashPassword(password)
				let jam = moment()
				// console.log(jam.toString())
				const data = await user_m.create({ id:nanoid(20),username:`${username}`,password:`${hash_pass}`,first_name:`${first_name}`,middle_name:`${middle_name}`,last_name:`${last_name}`,phone:`${phone}`,email:`${email}`,last_login,intro:`${intro}`,profile:`${profile}` })

	            res.status(200).json({ status: 200, message: "sukses", data })
			}
		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "gagal", data: err })
		}
	}

	static async list_user(req,res){
		const { username,password,first_name,middle_name,last_name,phone,email,last_login,intro,profile } = req.body

		try{
			let data = await sq.query(`select * from "user" `)
			let total = await sq.query(`select count(*) as "total" from "user" `)

            res.status(200).json({ status: 200, message: "sukses", data:data[0] })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "gagal", data: err })
		}
	}
	static async login(req,res){
		const { username,password,email } = req.body

		try{
			let data = await sq.query(`select * from "user" where username = :username or email = :email`,type({username,email}))

			if(data.length < 1){ return res.status(200).json({ status: 500, message: "username or email tidak ada" }) }
			// console.log(data.length < 0);
			let hash_pass = data[0].password
			let match = bcrypt.compare(password,hash_pass) 

			if(!match){ return res.status(200).json({ status: 500, message: "password salah"}) }
			let token = jwt.generateToken({id:data[0].id})
			await user_m.update({last_login:moment().toString()},{where:{id:data[0].id}})
			
            res.status(200).json({ status: 200, message: "sukses",token })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "gagal", data: err })
		}
	}
	static async delete(req,res){
		const { id } = req.params.id

		try{
			console.log(id);
			await user_m.destroy({where:{id}})
			
            res.status(200).json({ status: 200, message: "sukses" })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "gagal", data: err })
		}
	}
	static async token(req,res){
		const { token } = req.body

		try{
			let data = jwt.verifyToken(token)
			
            res.status(200).json({ status: 200, message: "sukses",data })

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "gagal", data: err })
		}
	}

}


module.exports = Controller