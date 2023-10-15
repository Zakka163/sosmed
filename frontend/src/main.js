import { createApp } from 'vue'
import { router } from './router/index'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './style.css'
import App from './App.vue'
// // App.use(router)
// Vue.createApp(App).use(router).mount('#app')
import mitt from 'mitt';                  // Import mitt
const emitter = mitt();                   // Initialize mitt

const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.provide('emitter', emitter);  
   
app.mount('#app')
