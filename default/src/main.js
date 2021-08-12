import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
<<<<<<< HEAD
import '@static/styles/scss/default.scss'
=======
import '@static/styles/scss/index.scss'
>>>>>>> sass
import '@static/styles/reset.css'
import './public-path'
import './iview'
Vue.config.productionTip = false

let instance = null
function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap() {
  /* eslint-disable */
  console.log('[vue] vue app bootstraped')
  /* eslint-enable */
}
export async function mount(props) {
  /* eslint-disable */
  console.log('[vue] props from main framework', props)
  /* eslint-enable */
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
