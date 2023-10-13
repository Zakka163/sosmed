const router = require('express').Router();
const controller_message = require('../controller/message');
const auth = require('../middleware/auth').auth

router.post('/list_message', auth, controller_message.list_message);
router.post('/list_by_message', auth, controller_message.list_by_message);
router.post('/send_message', auth, controller_message.send_message);
router.put('/update_message', auth, controller_message.update_message)
router.delete('/delete_message/:id', auth, controller_message.delete_message)
router.get('/detail_message/:id', auth, controller_message.detail_message)


module.exports = router

