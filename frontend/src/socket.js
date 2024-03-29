// import { reactive } from "vue";
import { io } from "socket.io-client";

// export const state = reactive({
//   connected: false,
//   id:''
// });

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://sosmed-backend-api.vercel.app:8080'

const socket = io(URL, { autoConnect: true });

export default socket;
// socket.id = 'satu'
// console.log(socket.id)

// socket.on("connect", () => {
//   socket.id = 'satu'
//   console.log(socket.id)
//   state.id = socket.id
//   state.connected = true;
// });

// socket.on("disconnect", () => {
//   state.connected = false;
// });