import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeAssistantView from '../views/HomeAssistantView.vue'
import ScreenSaverView from '../views/ScreenSaverView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: ScreenSaverView
  },
  {
    path: '/home-assistant',
    name: 'home-assistant',
    component: HomeAssistantView
  },
  {
    path: '/screen-saver',
    name: 'screen-saver',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ScreenSaverView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
