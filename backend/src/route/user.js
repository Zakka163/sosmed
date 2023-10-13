const router = require('express').Router();

const controller_user = require('../controller/user');
const controller_otp = require('../controller/otp');
const auth = require('../middleware/auth').auth

router.post('/register', controller_user.register);
router.post('/login', controller_user.login);
router.delete('/logout/:id', auth,controller_user.logout);
router.post('/list_user', auth,controller_user.list_user);

router.post('/send_otp',auth, controller_otp.send_otp_email);
router.post('/verify_otp',auth, controller_otp.verify_otp);

router.get('/user_by_id/:id',auth, controller_user.user_by_id)

module.exports = router

