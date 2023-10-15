// import { createServer } from "http";
// import { Server } from "socket.io";
const {createServer} = require('http')
const { Server } = require('socket.io')

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {
//   socket.id = 'satu'

  console.log(socket.id)
  socket.on('tes',(data)=>{
    console.log(data)
    io.emit('send',data)
  })
  // ...
});

httpServer.listen(3000);
