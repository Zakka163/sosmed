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
app.mount('#app')
