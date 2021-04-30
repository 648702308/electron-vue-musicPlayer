<template>
  <div class="right-meun">
    <!--最小化-->
    <span v-if="layout.indexOf('min')>=0" class="icon-wrapper pointer no-drag" @click="screenAction('minWindow')"
          title="最小化">
          <i class="iconfont icon-minimum"></i>
        </span>
    <!--最大化/还原-->
    <span v-if="layout.indexOf('max')>=0" class="icon-wrapper pointer no-drag" @click="screenAction('maxWindow')"
          :title="winFlag?'还原':'最大化'">
          <i class="iconfont" :class="{'icon-huanyuan':winFlag,'icon-maximum':!winFlag}"></i>
        </span>
    <!--关闭-->
    <span v-if="layout.indexOf('close')>=0" class="icon-wrapper pointer no-drag" @click="screenAction('closeWindow')"
          title="关闭">
          <i class="iconfont icon-close"></i>
        </span>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    name: "HeadMenu",
    props: {
      layout: {
        type: Array, default: () => {
          return ['min', 'max', 'close']
        }
      }
    },
    data() {
      return {
        winFlag: false // winFlag为true时，代表要进行窗口最大化操作
      }
    },
    methods: {
      screenAction(action) {
        if (action === 'maxWindow') {
          this.winFlag = !this.winFlag
          ipcRenderer.send(action, {winFlag: this.winFlag})
        } else if (action === 'minWindow') {
          ipcRenderer.send(action)
        } else if (action === 'closeWindow') {
          this.$confirm('此操作将退出云音乐, 是否继续?', '退出应用', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            ipcRenderer.send(action)
          }).catch(() => {
          })
        }
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

<style scoped lang="scss">
  .right-meun {
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-wrapper {
      display: inline-block;
      width: 30px;
      text-align: center;
    }
  }
</style>
