import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import store from 'store'

import { options } from '@conf'
export function encrypt(str) {
  let key = CryptoJS.enc.Base64.parse(options.key) // key 要和后台一致
  let iv = CryptoJS.enc.Base64.parse(options.iv) // iv 要和后台一致
  str = CryptoJS.enc.Utf8.parse(str)
  return CryptoJS.DES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  }).toString()
}
// 登录密码解密
export const decrypt = str => {
  let key = CryptoJS.enc.Base64.parse(options.key)
  let iv = CryptoJS.enc.Base64.parse(options.iv)
  let decryptObj = CryptoJS.DES.decrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  })
  return decryptObj.toString(CryptoJS.enc.Utf8)
}

export const setCookie = (str, data, obj) => {
  Cookies.set(str, data, { expires: 300, ...obj })
}
export const getCookie = str => {
  return Cookies.get(str)
}
export const setStore = (str, data) => {
  store.set(str, data)
}
export const getStore = str => {
  return store.get(str)
}
export const testData = data => {
  let reg = /(^\s+)|(\s+$)|\s+/g
  return reg.test(data)
}

export const testIpt = data => {
  let reg = /([^\s])/g
  return reg.test(data)
}

// 时间格式化
export function DateFormat(date, format) {
  // time时间格式化
  if (date === null || date === '') return ''

  if (typeof date === 'string') {
    // 如果是字符串转换为日期型
    date = new Date(date)
  }

  if (!format) {
    format = 'yyyy-MM-dd HH:mm:ss'
  }
  let obj = {
    'M+': date.getMonth() + 1, // 返回实际月份
    'd+': date.getDate(), // 返回当月第几天
    'H+': date.getHours(), // 返回小时
    'm+': date.getMinutes(), // 返回分钟
    's+': date.getSeconds(), // 返回秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 返回第几个季度
    S: date.getMilliseconds(), // 返回毫秒
    w: date.getDay(), // 返回星期几，0为星期日
    W: '日一二三四五六'.charAt(date.getDay()) // 返回星期几的中文表示
  }

  // 年的单独处理
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  // 其他格式处理

  for (let k in obj) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? obj[k]
          : ('00' + obj[k]).substr(('' + obj[k]).length)
      )
    }
  }
  return format
}
