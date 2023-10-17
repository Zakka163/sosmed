// import { createServer } from "http";
// import { Server } from "socket.io";
const { createServer } = require('http')
const { Server } = require('socket.io')
const type = require('../helper/type.js')
const { sq } = require('../config/connection.js')
const message_m = require('../model/message')
const message_pool_m = require('../model/message_pool')
const message_sub_m = require('../model/message_sub')

const { nanoid } = require('nanoid')
const moment = require('moment')


const httpServer = createServer();

const koneksi = (server) => {
  const users = [];
  const io = new Server(server, { cors: "*" });

  io.on("connection", (socket) => {
    // console.log(socket)
    // for (let [id, socket] of io.of("/").sockets) {
    //   users.push({
    //     userID: id,
    //     usernama:socket.username
    //   });
    // }
    //   console.log("connect..")

    //   console.log(users)

    socket.on('send_message', async (data) => {
      const { message_id, to_user_id, from_user_id, message_value, last_message, last_sent_user } = data
      try {
        console.log(data)
        if (!message_id) {
          await sq.transaction(async (t) => {
            let result_message = await message_m.create({ id: nanoid(14), last_message, last_sent_user }, { transaction: t })
            let result_message_sub = await message_sub_m.create({ id: nanoid(14), message_id: result_message.id, user_id_1: from_user_id, user_id_2: to_user_id }, { transaction: t })
            let result_message_pool = await message_pool_m.create({ id: nanoid(14), message_id: result_message.id, to_user_id, from_user_id, message_value }, { transaction: t })
            return {
              result_message,
              result_message_pool,
              result_message_sub
            }
          })
        } else {
          await message_pool_m.create({ id: nanoid(14), message_id, to_user_id, from_user_id, message_value })
        }
      }
      catch (err) {   
        console.log(err)
      }
      io.emit('refresh_conversation', {"status":200} )
      io.emit('refresh_message', {"status":200} )
      // io.emit('refresh_pesan',"semua")
    })
    socket.on('disconnecting', (sok) => {
      console.log(socket.id)
    })



    // socket.on('send_message',(data)=>{
    //   console.log(data)
    //   socket.emit('refresh_pesan',`ini data kamu ${data.message}`)
    //   io.emit('refresh_pesan',"semua")
    // })




  })


}




// httpServer.listen(3000);

module.exports = { koneksi }
