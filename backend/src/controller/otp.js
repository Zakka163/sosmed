const transporter = require('../helper/node_email.js')
const otp = require('../helper/otp.js')
const type = require('../helper/type.js')
const {sq} = require('../config/connection.js')
const dotenv = require('dotenv').config({ path:'./src/.env' })
const user_otp_m = require('../model/user_otp')
const {nanoid} = require('nanoid')

const moment = require('moment')




const verify_otp = async (req,res)=>{
		const {email,user_id,otp,otp_id} = req.body
		try{

			if (!otp) return res.status(500).json({ status: 500, message: "empty otp"})
			
			const data_user_otp = await sq.query(`select * from user_otp uo join "user" u on u.id = uo.user_id where uo.id = :otp_id and uo.user_id = :user_id and uo.is_verified = '0'`,type({otp_id:`${otp_id}`,user_id:`${user_id}`}))
			
			if(data_user_otp.length < 1){ return res.status(200).json({ status: 500, message: "no data user_otp" }) }const match = data_user_otp[0].otp == otp
			const check_expiration_time = data_user_otp[0].expiration_time.toString() > moment().toString()
			console.log(check_expiration_time)
			console.log(data_user_otp[0].expiration_time,'  = ',moment().toString())
			// console.log(data_user_otp[0])
			
			if(!check_expiration_time){ return res.status(200).json({ status: 500, message: "otp experied" }) }
			if(!match){ return res.status(200).json({ status: 500, message: "wrong otp" }) }

			await user_otp_m.update({is_verified:'1'},{where:{id:otp_id}})
			
			res.status(200).json({ status: 200, message: "success" })
		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
}



const send_otp_email = async (req,res)=>{
		const {email,type,user_id} = req.body
		try{
			if (!email) return res.status(500).json({ status: 500, message: "empty email"})

			const code_otp  = otp.generate_otp(4)
			const expiration_time = otp.generate_expiration_time(8)
			const mail_options = {
			  from: process.env.GMAIL_USER,
			  to: email,
			  subject: 'OTP sosmed',
			  text: code_otp
			};
			const result = await user_otp_m.create({id:nanoid(10),otp:code_otp,expiration_time,user_id})
			transporter.sendMail(mail_options, function(error, info){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
				// console.log(result)
			    res.status(200).json({ status: 200, message: "success", data:result })
			  }
			}); 

		}
		catch(err){
			console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "failed", data: err })
		}
}


module.exports = {
	send_otp_email,
	verify_otp
}