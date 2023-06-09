const multer = require("multer");
const path = require('path')
const md5 = require('md5')

// membuat konfigurasi diskStorage multer
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      md5(req.query.nama) + path.extname(file.originalname)
    );
  },
});


module.exports = diskStorage