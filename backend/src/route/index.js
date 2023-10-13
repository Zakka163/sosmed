const router = require("express").Router();
const error_handler = require('../helper/error_handler').error

router.use('/user',require('./user'))
router.use('/message',require('./message'))
// router.get('/tes',(req,res,next)=>{
// 	try{
// 		throw new Error('BROKEN')
// 	}catch(err){
// 			next(err)

// 	}
// },error_handler)
module.exports = router