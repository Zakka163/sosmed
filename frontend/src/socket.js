import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  id:''
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL);
// socket.id = 'satu'
// console.log(socket.id)

socket.on("connect", () => {
  socket.id = 'satu'
  console.log(socket.id)
  state.id = socket.id
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});