const router = require("express").Router();
const error_handler = require('../helper/error_handler').error

router.use('/user',require('./user'))
router.use('/message',require('./message'))

module.exports = router