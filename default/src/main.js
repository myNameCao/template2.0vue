import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@static/styles/reset.css'
import axios from 'axios'
import './iview'
Vue.config.productionTip = false

axios.get('/config.json').then(res => {
  window.config =
    res.data.urls.find(item => {
      return item.webUrL === window.location.origin
    }) || {}
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}) // 获取配置文件
