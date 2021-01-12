export default {
  defaulteApi: {
    host: 'http://qaxyexamapi.xycxedu.cn:16580',
    withCredentials: false,
    token: true,
    path: {
      PaperDetailById: '/api/SchoolExam/GetPaperDetailById' //组卷详情
    }
  },
  userApi: {
    host: 'http://qacenterapi.xycxedu.cn:16580',
    withCredentials: true,
    token: false,
    path: {
      login: '/login.api', // login
      userInfo: '/user.api'
    }
  },
  webHM: {}
}
