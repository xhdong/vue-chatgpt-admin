import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang cn
Vue.use(ElementUI, { locale })

// 引入页面入口
import App from './App'

// 引入 vue-bus
import VueBus from 'vue-bus'
Vue.use(VueBus)

// 引入store
import store from './store'

// 引入router
import router from './router'

import '@/icons' // icon

import '@/styles/reset.scss'
import '@/styles/global.scss'
import '@/styles/sidebar.scss'

// permission control
import './permission'

// simulation data
import './mock'

// global filters
import * as filters from './filters'
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 阻止启动生产消息
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
