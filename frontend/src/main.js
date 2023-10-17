<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
//import './assets/tailwind.css'
import infiniteScroll from 'vue-infinite-scroll'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(infiniteScroll)
=======
import { createApp } from 'vue'
import { router } from './router/index'
import 'vue-toast-notification/dist/theme-sugar.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './style.css'

// // App.use(router)
// Vue.createApp(App).use(router).mount('#app')

import App from './App.vue'
// import mitt from 'mitt';                  // Import mitt
// const emitter = mitt();                   // Initialize mitt

const app = createApp(App)
// app.use(useToast);
// app.use(VueCookies)
app.use(router)
// app.provide('emitter', emitter);  

>>>>>>> master
app.mount('#app')
