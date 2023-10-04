const router = require('express').Router();

const controller_user = require('../controller/user');
const controller_otp = require('../controller/otp');
const auth = require('../middleware/auth').auth

router.post('/register', controller_user.register);
router.post('/login', controller_user.login);
router.delete('/logout/:id', auth,controller_user.logout);
router.post('/list_user', auth,controller_user.list_user);


// router.post('/list_user', auth,Controller.listUser);
// router.delete('/delete/:id', auth,Controller.delete);

// router.post('/send_otp',Controller.sendOtp);

// router.post('/update', authentification, Controller.update);
// router.post('/delete', authentification, Controller.delete);
// router.post('/list', authentification, Controller.list);
// router.post('/details_by_id', authentification, Controller.details_by_id);



router.post('/send_otp',auth, controller_otp.send_otp_email);
router.post('/verify_otp',auth, controller_otp.verify_otp);



module.exports = router

