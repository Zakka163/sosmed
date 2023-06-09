const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream') // version 2.x

const accessLogStream = rfs.createStream('request.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../log')
})// 


module.exports = accessLogStream