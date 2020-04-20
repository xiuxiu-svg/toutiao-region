// 项目的启动入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载index.less
import './styles/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 通过render方法把根组件渲染到#app节点。
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
