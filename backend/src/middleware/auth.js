const jwt = require('../helper/jwt')
const { sq } = require('../config/connection')
const type = require('../helper/type')

const auth = async (req, res, next) => {
    try {
        const { token } = req.body
        if (!token) return res.status(500).json({ status: 500, message: "no token" })

        let payload = jwt.verifyToken(token)
        // console.log(payload)
        const chechk_token = await sq.query(`select * from user_auth where id = :id and "deletedAt" isnull`, type({ id: payload.id }))
        // console.log(chechk_token )
        if (chechk_token < 1) return res.status(500).json({ status: 500, message: "authentication failed" })


         req.body.user_id = chechk_token[0].user_id
        next()
    } catch (err) {
        console.log(req.body)
        console.log(err)
        res.status(500).json({ status: 500, message: "failed", data: err })
    }
}
// const auth = async (req,res,next)=>{
//    next()
// }


module.exports = { auth }