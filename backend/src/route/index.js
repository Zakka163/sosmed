const router = require("express").Router();
const error_handler = require('../helper/error_handler').error

router.use('/user',require('./user'))
router.use('/message',require('./message'))
router.post('/obat', (req,res)=>{
    console.log(req.body)
    if(req.body.jmlPermintaan == 1){
        res.status(400).json({"status":"berhasil"})
    }else{
        res.json({"status":"berhasil"})
    }
    
});

module.exports = router