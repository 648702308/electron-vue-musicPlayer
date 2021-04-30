<template>
  <div class="headbar no-copy drag">
    <div class="headbar-wrapper">
      <!--系统名称-->
      <div class="headbar-wrapper-item headbar-title">{{TITLE}}</div>
      <!--登录店名、用户-->
      <div class="headbar-wrapper-item headbar-center">
        <span class="pointer no-drag" @click="Login">登录</span>
      </div>
      <!--自定义头部右侧菜单-->
      <div class="headbar-wrapper-item head-meun">
        <head-menu></head-menu>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadMenu from '@/components/HeadMenu/index'
  import {LoginStatus,resource,dragonBall} from '@/api/apis'
  export default {
    name: 'Headbar',
    components: {HeadMenu},
    data() {
      return {

      }
    },
    computed: {},
    mounted() {},
    methods: {
      Login(){
        this.$bus.$emit('login')
      },
      loginOut() {
        this.$confirm('是否退出系统？', '退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(async () => {
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/variables.scss";

  .headbar {
    .headbar-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      .headbar-wrapper-item {
        height: 100%;
        &.headbar-title {
          flex-shrink: 0;
          line-height: $headerHight;
          padding: 0 15px;
          font-size: 18px;
          font-weight: bold;
        }
        &.headbar-center {
          width: 100%;
          line-height: $headerHight;
          padding: 0 15px;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: right;
        }
        &.head-meun {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 5px;
        }
      }
    }
  }
</style>
