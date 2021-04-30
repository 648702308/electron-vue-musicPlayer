<template>
  <router-link v-if="!item.hidden" tag="div" class="menu-item" :to="to" exact >
    <div class="left"><i class="iconfont" :class="item.meta.icon"></i>{{item.meta.title}}</div>
  </router-link>
</template>

<script>
  export default {
    name: "SidebarItem",
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      to:{
        type: String,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../styles/lib/variables.scss";
  .menu-item {
    display: block;
    padding: 8px 10px;
    font-size: 13px;
    border-radius: 2px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background 0.3s;
    color: #333;
    .left {
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
