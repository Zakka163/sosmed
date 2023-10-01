const jwt = require('../helper/jwt')
const { sq } = require('../config/connection')
const type = require('../helper/type')

const auth = async (req,res,next)=>{
    try {
        const { token } = req.body
        if(!token) return res.status(500).json({ status: 500, message: "tidak ada token"})

        let payload = jwt.verifyToken(token)
        const match  = await sq.query(`select * from "user" where id = :id and "deletedAt" isnull`,type ({id:payload.id}))
        if(!match) return res.status(500).json({ status: 500, message: "auth gagal"})
        next()
    } catch (err) {
        console.log(req.body)
            console.log(err)
            res.status(500).json({ status: 500, message: "gagal", data: err })
    }
}
// const auth = async (req,res)=>{
//     try {
//         const { token } = req.body()
//         if(!token) return res.status(500).json({ status: 500, message: "tidak ada token"})

//         let payload = jwt.verifyToken(token)
//         const match  = await sq.query(`select * from "user" where id = :id`,type ({id:payload.id}))
//         if(!match) return res.status(500).json({ status: 500, message: "auth gagal"})
//         next()
//     } catch (err) {
//         console.log(req.body)
//             console.log(err)
//             res.status(500).json({ status: 500, message: "gagal", data: err })
//     }
// }


module.exports = {auth}