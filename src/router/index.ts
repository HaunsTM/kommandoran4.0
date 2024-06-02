import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ScreenSaverView from '../views/ScreenSaverView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'default',
    component: ScreenSaverView
  },
  {
    path: '/screen-saver',
    name: 'screen-saver',
    component: ScreenSaverView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
