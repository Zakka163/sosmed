import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import AddView from '../views/AddView.vue'
import ScrolView from '../views/ScrolView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/*', redirect: '/about' },

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditView
    },
    {
      path: '/add',
      name: 'add',
      component: AddView
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: ScrolView
    },
    
  ]
})

export default router
