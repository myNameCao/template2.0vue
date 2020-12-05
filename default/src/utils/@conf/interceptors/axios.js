import Cookies from 'js-cookie'
import baseApi from '@lib/baseApi'
import Toast, { loading, clearTip } from '@utils/xyui'
import errorHander from './errorHander'
let uid = 0
let list = {}
// Add a request interceptor
export const requestSuccess = res => {
  if (res.loading) {
    res.uid = uid++
    if (!Object.keys(list).length) {
      loading(res.landscape)
    }
  }
  list[res.uid] = true
  if (baseApi.privatePath[res.url]) {
    res.headers['token'] = Cookies.get('USER_LOGIN_NAME')
  }
  res.url = baseApi.privatePath[res.url] || baseApi.publicPath[res.url]
  return res
}
export const requestFail = requestError => {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  Toast.fail('网络连接失败,请重试......')
  return Promise.reject(requestError)
}
// Add a response interceptor

export const responseSuccess = responseObj => {
  delete list[responseObj.config.uid]
  if (!Object.keys(list).length) {
    setTimeout(clearTip, 1000)
  }
  if (!responseObj.data.success) {
    Toast.fail(responseObj.data.msg)
  }
  return responseObj.data
}
export const responseFail = responseError => {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  clearTip()
  let Fail = errorHander[responseError.response.status]
  Fail && Fail()
  return Promise.reject(responseError)
}
