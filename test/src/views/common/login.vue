<template>
  <div class="login-div">
    <div class="login-top">
      <h2 class="title">
        组题库
      </h2>
    </div>
    <form class="form">
      <input
        style="display: none"
        type="text"
        name="fakeusernameremembered"
      />
      <input
        style="display: none"
        type="password"
        name="fakepasswordremembered"
      />
      <input type="password" style="display: none" />
      <div class="form__cover"></div>
      <div class="form__loader">
        <div class="spinner active">
          <svg class="spinner__circular" viewBox="25 25 50 50">
            <circle
              class="spinner__path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="4"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
      </div>
      <div class="form__content">
        <div class="login-type-div">
          <p>账号登录</p>
        </div>
        <div class="error-div">
          <p v-show="errorTip != ''" class="error-tip">
            <i class="el-icon-warning"></i>{{ errorTip }}
          </p>
        </div>
        <div>
          <div class="styled-input">
            <i class="icon-user-m iconfont icon-login"></i>
            <input
              v-model="params.userCode"
              type="text"
              class="styled-input__input"
              name="nickname"
              autocomplete="off"
              placeholder="登录账号"
            />
          </div>
          <div class="styled-input">
            <i class="icon-mima iconfont icon-login"></i>
            <input
              v-model="params.password"
              type="password"
              class="styled-input__input"
              name="password"
              clearable
              placeholder="请输入登录密码"
              @focus="readonlyHandler"
              @change="inputHandler"
              @keyup.13="loginHandler"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            class="styled-button"
            @click="loginHandler"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    // inject: ['reload'],  // 注入 reload 方法
    data() {
      return {
        inputText: '',
        readonly: true,
        inputType: 'text',
        params: {
          userCode: '',
          password: '',
          isRememberPwd: false
        },
        errorTip: '',
        userInfo: [],
        loginStatus: false,
        loading: false,
        redirect: undefined,
        yzUserName: '',
        isShowYZ: false
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
      setTimeout(function() {
        document.body.classList.add('on-start')
      }, 100)
      setTimeout(function() {
        document.body.classList.add('document-loaded')
      }, 1800)
    },
    mounted() {
      this.loadCookies()
    },
    methods: {
      loadCookies() {
        let user = JSON.parse(window.localStorage.getItem('mark_web_user'))
        // console.log(user);
        if (user != null) {
          this.params.userCode = user.userCode
          if (user.isRememberPwd == true) {
            this.params.password = user.password
            this.params.isRememberPwd = true
          } else {
            this.params.isRememberPwd = false
          }
        }
      },
      inputHandler: function(e) {
        this.inputText = e.target.value
        this.$emit('input', e.target.value)
        this.inputType = 'password'
        if (e.target.value == '') {
          this.inputType = 'text'
          this.readonlyHandler(e)
        }
      },
      readonlyHandler: function() {
        this.readonly = true
        let timer = setTimeout(() => {
          clearTimeout(timer)
          this.readonly = false
        }, 0)
      },
      loginHandler() {
        this.errorTip = ''
        if (this.params.userCode == '') {
          this.errorTip = '请输入登录账户!'
          return
        }
        if (this.params.password == '') {
          this.errorTip = '请输入登录密码!'
          return
        }
      },
      loginResult(user) {
        // 要记录缓存的数据记录是否记住密码
        user['isRememberPwd'] = this.params.isRememberPwd
        user['password'] = this.params.password
        // this.$cookies.set('mark_web_username', token, '2h')
        // -1:永久 0:立即删除 秒:s 分:min 时:h 天:d 月:m 年:y
        localStorage.setItem('mark_web_user', JSON.stringify(user))
        this.$router.push('/')
      },
      manyNamesHandler() {
        this.errorTip = ''
        if (this.user.name == '') {
          this.errorTip = '请输入姓名!'
          return
        }
        let users = this.userInfo
        let relName = this.user.name
        let result = false
        if (users != undefined && users.length > 1) {
          var user = {}
          for (let i = 0; i < users.length; i++) {
            if (users[i].name === relName) {
              user = users[i]
              result = true
              break
            }
          }
          if (result) {
            this.$cookies.set('mark_web_username', user.name, '7d')
            localStorage.setItem('mark_web_user', JSON.stringify(user))
            this.$router.push('/')
          } else {
            this.errorTip = '该用户不存在!'
          }
        }
      },
      cleanUserInfo() {
        this.userInfo = []
      }
    }
  }
</script>
<style scoped>
  .login-div {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    /* background: url(../../static/img/bg.jpg); */
    background-color: #409eff;
    background-size: 100% 100%;
  }
  .title {
    font-size: 25px;
    font-weight: 500;
  }
  .login-top {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccd0d2;
  }

  .icon-login {
    color: white;
    font-size: 24px;
    line-height: 24px;
    padding: 0 10px;
    border-right: 1px solid white;
  }

  h2 {
    color: white;
    padding-left: 20px;
  }

  .login-top > span {
    color: white;
    font-size: 14px;
    display: inline-block;
    padding-right: 20px;
  }

  .form {
    width: 360px;
    height: 360px;
    display: flex;
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    padding: 1em;
    border-radius: 0.3em;
    margin: 5em 10% auto auto;
  }

  .form__loader {
    left: 0;
    top: 0;
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    align-items: center;
    z-index: -4;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
  }

  .form__content {
    width: 100%;
    opacity: 0;
    margin: 0 auto;
    position: relative;
    -webkit-transition: all 0.5s ease 0.7s;
    transition: all 0.5s ease 0.7s;
  }

  .login-type-div {
    color: white;
    height: 42px;
    display: flex;
    margin-bottom: 14px;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #cccccc;
  }

  .error-div {
    height: 40px;
  }

  .error-tip {
    font-size: 14px;
    color: #ff4d51;
    text-align: left;
    padding: 4px;
    border: 1px solid #ff4d51;
  }

  .error-tip > i {
    margin: 0 4px;
  }

  .forget-div {
    font-size: 14px;
    color: white;
    display: flex;
    margin-bottom: 8px;
    justify-content: space-between;
  }

  .forget-div > span {
    cursor: pointer;
  }

  .form__cover {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -4;
    border-radius: 7px;
    overflow: hidden;
    -webkit-transition: all 0.3s ease 0.8s;
    transition: all 0.3s ease 0.8s;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }

  .form__cover:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    /* background:lightseagreen; */
    z-index: -4;
    border-radius: 50%;
    -webkit-transition: all 1.5s ease 0.3s;
    transition: all 1.5s ease 0.3s;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  .form__cover:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: white;
    z-index: -5;
    border-radius: 50%;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  body.on-start .form__cover:before {
    -webkit-transform: scale(0.15);
    transform: scale(0.15);
  }

  body.document-loaded .form__loader {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
    visibility: hidden;
  }

  body.document-loaded .form__content {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }

  body.document-loaded .form__cover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  body.document-loaded .form__cover:after {
    -webkit-transform: scale(2);
    transform: scale(2);
  }

  body.document-loaded .form__cover:before {
    -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
    transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
    transition: transform 2s ease, opacity 0.3s ease 0.8s;
    transition: transform 2s ease, opacity 0.3s ease 0.8s,
      -webkit-transform 2s ease;
    -webkit-transform: scale(2);
    transform: scale(2);
    opacity: 0;
  }

  .styled-button {
    cursor: pointer;
    width: 100%;
    padding: 12px;
    margin-top: 12px;
    background: none;
    color: white;
    border-radius: 3px;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5em;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.6);
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .styled-button:hover,
  .styled-button:active {
    opacity: 0.6;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: #0c3368;
  }

  .styled-button:active {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .styled-input {
    width: 100%;
    position: relative;
    margin-bottom: 25px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .styled-input__input {
    width: 100%;
    -webkit-appearance: none;
    font-size: 14px;
    outline: none;
    background: none;
    padding: 10px;
    border: none;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
  }

  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, 0.6);
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.6);
  }

  .styled-input:hover {
    border-color: rgba(255, 255, 255, 0.6);
  }

  .styled-input.filled {
    border-color: rgba(255, 255, 255, 0.4);
  }

  .styled-input.filled .styled-input__circle:after {
    -webkit-transform: scale(37);
    transform: scale(37);
    opacity: 0;
  }

  .spinner {
    position: relative;
    margin: auto;
    width: 50px;
    height: 50px;
    -webkit-transition: all 0.2s ease 0s;
    transition: all 0.2s ease 0s;
  }

  .spinner__circular {
    -webkit-animation: rotate 1.5s linear infinite;
    animation: rotate 1.5s linear infinite;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: auto;
  }

  .spinner__path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.3s ease forwards 0.5s;
    animation: dash 1.3s ease forwards 0.5s;
    opacity: 0;
    stroke-linecap: round;
    stroke: #1994e4;
    -webkit-animation-play-state: running;
    animation-play-state: running;
  }

  @-webkit-keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      opacity: 0;
    }
    50% {
      stroke-dasharray: 40, 200;
      opacity: 1;
    }
    100% {
      stroke-dasharray: 125, 200;
      opacity: 1;
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      opacity: 0;
    }
    50% {
      stroke-dasharray: 40, 200;
      opacity: 1;
    }
    100% {
      stroke-dasharray: 125, 200;
      opacity: 1;
    }
  }
</style>
