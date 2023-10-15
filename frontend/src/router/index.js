import { createRouter ,createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Message from '../views/Message.vue'
import MessageDetail from '../views/MessageDetail.vue'
import PageNotFound from '../views/PageNotFound.vue'

// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// // We'll talk about nested routes later.
const routes = [
  { path: '/',name:'home', component: Home },
  { path: '/login', name:'login', component: Login },
  { path: '/register', name:'register', component: Register },
  { path: '/message', name:'message', component: Message },
  { path: '/message/:id', name:'message_detail', component: MessageDetail },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound }
//   { path: '/about', component: About },
]

// // 3. Create the router instance and pass the `routes` option
// // You can pass in additional options here, but let's
// // keep it simple for now.
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// console.log(vueRouter)

// export const data ='tes'