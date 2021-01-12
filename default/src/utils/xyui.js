//  工程中的 ui 库封装
import store from '@/store'

export function Dialog() {}
export function Notify() {}
export function loading() {
  store.commit('setLoading', true)
}
export function clearTip() {
  store.commit('setLoading', false)
}
export let Toast = {
  // 提示
  fail() {},
  // 错误
  error() {},
  // 警告
  warn() {},
  // 成功
  success() {},
  modal() {}
}
export default Toast
