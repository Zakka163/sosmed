const router = require('express').Router();
const controller_message = require('../controller/message');
const auth = require('../middleware/auth').auth

router.post('/list_message',auth, controller_message.list_message);
router.post('/list_by_message',auth, controller_message.list_by_message);
router.post('/send_message',auth, controller_message.send_message);


module.exports = router

