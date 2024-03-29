require('dotenv').config({})
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const routing = require('./route/index')
const {not_found,error}= require('./helper/error_handler')
const { createServer } = require('http')
const {koneksi} = require('./helper/socket')
const httpServer = createServer(app);
// const server = require('http').createServer(app)
// const { koneksi_socket } = require('./helper/socket')
// koneksi_socket(server)
koneksi(httpServer)
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(express.static('asset/file/'));

app.use('/', routing);
app.use(not_found)

const port = process.env.PORT || 5000
httpServer.listen(port, () => {
	console.log(`has been connected to the port : ${port}`)
});
