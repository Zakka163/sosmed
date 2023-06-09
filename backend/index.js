
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./router/router.js')
const morgan = require('morgan');
const accessLogStream = require('./log/index.js');

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
