import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import index from '../views/colorPicker/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: index
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
