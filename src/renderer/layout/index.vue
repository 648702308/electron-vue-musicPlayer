<template>
  <div class="app-wrapper no-copy">
    <!--头部-->
    <header class="main-header">
      <headbar/>
    </header>
    <!--中间区域-->
    <section class="main-container">
      <aside class="main-aside">
        <sidebar></sidebar>
      </aside>
      <app-main v-if="isRouterAlive"/>
    </section>

    <!--底部-->
    <footer class="main-footer align-center justify-center">
      <footbar></footbar>
    </footer>
    <!--登陆-->
    <login-view></login-view>
  </div>
</template>

<script>
  import {AppMain, Headbar, Settings, Notice, Sidebar, Footbar} from './components'
  import LoginView from '@/viewc/login/index'
  import {get} from '@/api/apis'

  export default {
    name: 'Layout',
    provide() {
      return {
        reload: this.reload
      }
    },
    components: {
      AppMain,
      Headbar,
      Settings,
      Notice,
      Sidebar,
      Footbar,
      LoginView
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    mounted() {
      this.loginStatus()
    },
    methods: {
      // 刷新页面（main区域）
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
      // 检车登陆状态
      loginStatus() {
        this.$store.dispatch('user/checkLogin')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .app-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    .main-header {
      height: $headerHight;
      background: #ececec;
      flex-shrink: 0;
    }
    .main-container {
      display: flex;
      flex-direction: row;
      height: 100%;
      .main-aside {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        background: linear-gradient(to bottom, #efefef, #efefef);
        padding: 15px 0;
      }
    }
    .main-footer {
      height: $footerHight;
      background: #ececec;
      flex-shrink: 0;
    }
  }
</style>
