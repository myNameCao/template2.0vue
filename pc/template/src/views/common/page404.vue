<template>
  <div class="page_sigle">
    <div class="tip">
      <img :src="url" alt="404" class="imgtip" />
      <div>抱歉！您访问的页面不存在</div>
    </div>
  </div>
</template>

<script>
  // import axios, { setCookie } from '@utils'
  import img404 from '@static/img/page404.png'
  export default {
    data() {
      return {
        url: img404
      }
    },

    mounted() {}
  }
</script>
<style lang="less" scoped>
  .page_sigle {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .tip {
    position: absolute;
    font-size: 18px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333333;
    text-align: center;
    .imgtip {
      width: 884px;
      height: 349px;
    }
  }
</style>
