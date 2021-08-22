import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('@/views/me/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
