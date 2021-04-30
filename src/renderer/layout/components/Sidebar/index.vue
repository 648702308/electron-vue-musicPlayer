<template>
  <div class="wrap">
    <menus/>
  </div>
</template>
<script>
  import menus from './menu'

  export default {
    components: {menus,}
  }
</script>
<style lang="scss" scoped>
  .wrap {
    width: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
