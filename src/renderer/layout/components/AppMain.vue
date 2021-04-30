<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.path
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
</style>

