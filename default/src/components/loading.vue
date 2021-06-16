<template>
  <div class="shodow">
    <div class="loading_content">
      <a-spin size="large" />
    </div>
  </div>
</template>
<script>
  // @ is an alias to /src
  export default {
    name: 'Loading',
    methods: {}
  }
</script>

<style lang="less" scoped>
  .shodow {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 99999;
    .loading_content {
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }
</style>
