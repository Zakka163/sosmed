
require('dotenv').config();
const express = require('express')
const cors = require('cors')
// const controller = require('./controller/controller.js')
const router = require('./router/router.js')





const app = express()
let corsOptions = {
  origin : ['http://localhost:5173'],
}
 
app.use(cors())
 
const port = process.env.PORT || 5000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
