import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/Home/home'
Vue.use(VueRouter)

const routes = [
  // 登录页路由规则
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  // layout布局嵌套路由 首页子组件路径不写默认是父路由的路径 父路不命名
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
// 路由导航守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(to, from, user)
  // 判断是否是要去除登录之外的任意界面
  if (to.path !== '/login') {
    // 如果有用户信息给过否则去登陆
    if (user) {
      next()
    } else {
      next('/login')
    }
  // next()
  } else {
    next()
  }
})
export default router
