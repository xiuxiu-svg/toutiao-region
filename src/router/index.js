import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/Home/home'

// 引入发表文章组件
import publishIndex from '@/views/publish'
// 引入文章管理组件
import ArticleIndex from '@/views/article'
// 引入用户素材组件
import imageIndex from '@/views/image'
//  引入评论组件
import commentIndex from '@/views/comment'
// 引入账户组件
import accountIndex from '@/views/account'
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
      },
      // 文章管理页面路由规则
      {
        path: '/article',
        component: ArticleIndex,
        name: 'ArticleIndex'
      },
      // 文章发布页面路由规则
      {
        path: '/publish',
        component: publishIndex,
        name: 'publishIndex'
      },
      {
        path: '/image',
        component: imageIndex,
        name: 'imageIndex'
      },
      {
        path: '/comment',
        component: commentIndex,
        name: 'commentIndex'
      },
      {
        path: '/profile',
        component: accountIndex,
        name: 'accountIndex'
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
