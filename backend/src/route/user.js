const router = require('express').Router();

const controller_user = require('../controller/user');
const controller_otp = require('../controller/otp');
const auth = require('../middleware/auth').auth
const { error }= require('../helper/error_handler')


router.post('/register', controller_user.register,error);
router.post('/login', controller_user.login,error);
router.post('/logout',auth,controller_user.logout);
router.post('/user_by_id',auth,controller_user.user_by_id)
// router.post('/list_user', auth,controller_user.list_user);

// router.post('/send_otp',auth, controller_otp.send_otp_email);
// router.post('/verify_otp',auth, controller_otp.verify_otp);

// router.get('/user_by_id/:id',auth, controller_user.user_by_id)



module.exports = router

