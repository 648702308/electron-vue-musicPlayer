<template>
  <el-scrollbar class="menu-view scroll-page">
    <!--routers-->
    <template v-for="(item,index) in staticRoutes" v-if="!item.hidden">
      <template v-if="!item.drop">
        <div class="menu-group" :key="index">
          <div class="menu-title">{{item.meta.title}}</div>
          <sidebar-item v-for="route in item.children" :key="route.path" :item="route" :to="item.path+'/'+route.path"/>
        </div>
      </template>
    </template>

    <!--tabs menu-->
    <click-sidebar-item :data="userSongSheets" prev-path="/sheet/d" title="创建的歌单"></click-sidebar-item>
    <click-sidebar-item :data="collectSheets" prev-path="/collect/d" title="收藏的歌单"></click-sidebar-item>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'
  import ClickSidebarItem from './ClickSidebarItem'

  export default {
    components: {SidebarItem, ClickSidebarItem},
    data() {
      return {
        showDropIndex: '',
        establishSong: false
      }
    },
    computed: {
      ...mapGetters([
        'staticRoutes',
        'userSongSheets',
        'collectSheets'
      ])
    },
    mounted() {
    },
    methods: {
      dropDown(index) {
        if (this.showDropIndex === index) {
          this.showDropIndex = ''
        } else {
          this.showDropIndex = index
        }
      },
      addDrop() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-page {
    overflow: hidden;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .menu-view {
    flex: 1;
    overflow: hidden;
    .menu-group {
      margin-bottom: 20px;
      padding: 0 10px;
      .hide {
        display: none;
        transition: all 0.3s;
      }
      .show {
        display: block;
      }
      .menu-title {
        margin-bottom: 10px;
        font-size: 12px;
        padding-left: 5px;
        display: flex;
        align-items: center;
        color: #999;
        &.menu-drop {
          cursor: pointer;
        }
        .left {
          flex: 1;
        }
        .right {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .icon {
            font-size: 16px;
          }
          .iconfont {
            font-size: 14px;
            color: #888;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
