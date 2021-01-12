import Cookies from 'js-cookie'
import baseApi from '@lib/api'
import Toast, { loading, clearTip } from '@utils/xyui'
import errorHander from './errorHander'
let uid = 0
let list = []
// Add a request interceptor
export const requestSuccess = res => {
  res.method = res.type || 'get'
  res.params = res.params || null
  res.data = res.data || null
  res.host = res.host || 'defaulteApi'

  if (res.loading) {
    res.uid = uid++
    list.push(res.uid)
  }
  list.length && loading()
  let urlconfig = baseApi[res.host]
  urlconfig.host = null
  if (window.config && window.config[res.host]) {
    urlconfig.host = window.config[res.host]
  }
  let { host, path, withCredentials, token } = urlconfig
  res.token = res.token || token || true
  res.withCredentials = res.withCredentials || withCredentials || false
  if (res.token) {
    res.headers['token'] = Cookies.get('USER_LOGIN_NAME')
  }
  res.url = host + path[res.url]
  return res
}
export const requestFail = requestError => {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  Toast.fail('网络连接失败,请重试......')
  return Promise.reject(requestError)
}
// Add a response interceptor

export const responseSuccess = responseObj => {
  list.splice(list.indexOf(responseObj.config.uid), 1)
  !list.length && clearTip()
  // setTimeout(clearTip, 500)
  if (responseObj.data.success === false || responseObj.data.status === false) {
    if (!responseObj.config.noTip)
      setTimeout(Toast.fail(responseObj.data.msg), 1500)
  }
  return responseObj.data
}
export const responseFail = responseError => {
  list.splice(list.indexOf(responseError.config.uid), 1)
  !list.length && clearTip()
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  clearTip()
  let Fail = errorHander[responseError.response.status]
  Fail && Fail()
  return Promise.reject(responseError)
}
