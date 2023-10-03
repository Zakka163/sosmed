const Controller = require('../controller/user');
const controller_otp = require('../controller/otp');
const router = require('express').Router();
const auth = require('../middleware/auth').auth

// router.post('/register', Controller.register);
// router.post('/login', Controller.login);
// router.post('/token', Controller.token);


// router.post('/list_user', auth,Controller.listUser);
// router.delete('/delete/:id', auth,Controller.delete);
// router.delete('/logout/:id', auth,Controller.logout);

// router.post('/send_otp',Controller.sendOtp);

// router.post('/update', authentification, Controller.update);
// router.post('/delete', authentification, Controller.delete);
// router.post('/list', authentification, Controller.list);
// router.post('/details_by_id', authentification, Controller.details_by_id);
router.post('/send_otp', controller_otp.send_otp_email);
router.post('/verify_otp', controller_otp.verify_otp);



module.exports = router

