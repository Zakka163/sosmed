const Controller = require('../controller/user');
const router = require('express').Router();
const auth = require('../middleware/auth').auth

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/token', Controller.token);


router.post('/list_user', auth,Controller.list_user);
router.delete('/delete/:id', auth,Controller.delete);
router.delete('/logout/:id', auth,Controller.logout);

// router.post('/update', authentification, Controller.update);
// router.post('/delete', authentification, Controller.delete);
// router.post('/list', authentification, Controller.list);
// router.post('/details_by_id', authentification, Controller.details_by_id);

module.exports = router