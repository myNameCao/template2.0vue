<template>
  <div class="page_sigle">
    <div class="tip">
      <img :src="url" alt="500" class="imgtip" />
      <div>系统维护升级中</div>
    </div>
  </div>
</template>

<script>
  // import axios, { setCookie } from '@utils'
  import img500 from '@static/img/page500.png'
  export default {
    data() {
      return {
        url: img500
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
      width: 284px;
      height: 219px;
    }
  }
</style>
