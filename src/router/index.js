import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "group-foo" */ '@/views/login')
const Layout = () => import('@/views/layout')
const Home = () => import(/* webpackChunkName: "group-foo" */ '@/views/Home/home')
const publishIndex = () => import('@/views/publish')
const ArticleIndex = () => import(/* webpackChunkName: "group-foo" */ '@/views/article')
const imageIndex = () => import('@/views/image')
const commentIndex = () => import('@/views/comment')
const accountIndex = () => import('@/views/account')
const fansIndex = () => import('@/views/fans')

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
      // 用户图片素材页面路由
      {
        path: '/image',
        component: imageIndex,
        name: 'imageIndex'
      },
      // 评论管理页面路由规则
      {
        path: '/comment',
        component: commentIndex,
        name: 'commentIndex'
      },
      // 用户个人设置页面路由
      {
        path: '/profile',
        component: accountIndex,
        name: 'accountIndex'
      },
      // 粉丝管理页面路由规则
      {
        path: '/fans',
        component: fansIndex,
        name: 'fansIndex'
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
