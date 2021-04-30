<template>
  <div class="sync-menu-group" v-if="data.length">
    <div class="menu-title menu-drop" @click="dropDown()">
      <div class="left">
        {{title}}
        <i class="el-icon-sanjiao el-icon-caret-right" :class="{'active':establishSong}"></i>
      </div>
      <div class="right">
        <i class="icon el-icon-circle-plus-outline" @click.stop.prevent="addDrop"></i>
      </div>
    </div>
    <div class="click-sidebar-view">
      <el-collapse-transition>
        <div class="click-sidebar-group" v-show="establishSong">
          <div class="menu-item" v-for="(item,index) in data" :key="index"
               @click="toPlaylist(item.id)" :class="{active : activeMenu && activeMenu == item.id}">
            <div class="left"><i class="iconfont icon-yinle-1"></i>{{item.name}}</div>
          </div>
        </div>
      </el-collapse-transition>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ClickSidebarItem",
    props: {
      data: {
        type: Array, default: () => {
          return []
        }
      },
      prevPath: {type: String, required: true},
      title: {type: String, default: ''}
    },
    data() {
      return {
        establishSong: true
      }
    },
    computed: {
      // 设置选中的tab项
      activeMenu() {
        if (this.$route.path.indexOf(this.prevPath) >= 0) {
          return this.$route.params.id
        } else {
          return ''
        }
      }
    },
    methods: {
      dropDown() {
        this.establishSong = !this.establishSong
      },
      toPlaylist(id) {
        this.$router.push({path: `${this.prevPath}/${id}`})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/lib/variables.scss";

  .sync-menu-group {
    padding: 0 10px;
    .hide {
      display: none;
      transition: all 0.3s;
    }
    .show {
      display: block;
    }
    .menu-title {
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
        .el-icon-sanjiao {
          transition: all 0.3s;
        }
        .active {
          transform: rotate(90deg);
        }
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
    .click-sidebar-view {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .menu-item {
    padding: 8px 10px;
    font-size: 13px;
    border-radius: 2px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background 0.3s;
    .left {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      .iconfont {
        margin-right: 5px;
      }
      .iconfont.hot {
        color: #ff4400;
      }
    }
  }

  .menu-item:hover {
    background: #E6E7E7;
  }

  .menu-item.active {
    background: $red;
    color: #fff;
  }
</style>
