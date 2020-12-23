export const routerBeforeEach = (to, from, next) => {
  // let token = xyUtils.getCookie('.XYTOKEN') ? xyUtils.getCookie('.XYTOKEN') : ''
  document.title = to.meta.title || ''
  if (to.matched.some(record => record.meta.requireAuth)) {
    next()
  } else {
    next()
  }
}
