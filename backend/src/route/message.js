const router = require('express').Router();
const controller_message = require('../controller/message');
const auth = require('../middleware/auth').auth

router.get('/message_list',auth, controller_message.list);


module.exports = router

