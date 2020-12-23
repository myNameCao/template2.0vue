import router from '@/router'
export default {
  401() {
    router.replace({ path: '/login' })
  },
  404() {
    router.replace({ path: '/404' })
  },
  500() {
    router.replace({ path: '/500' })
  }
}
