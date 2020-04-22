import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/Home/home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/',
    component: Layout,
    name: '',
    children: [
      {
        path: '',
        component: Home,
        name: 'home'
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
