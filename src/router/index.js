import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/chart', name: 'Chart', component: () => import('../views/Chart.vue') },
  { path: '/map', name: 'Map', component: () => import('../views/Map.vue') },
  { path: '/chart', name: 'Chart', component: () => import('../views/Chart.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
