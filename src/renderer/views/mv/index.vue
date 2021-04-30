<template>
  <div class="mv" :key="updateId">
    <div class="padding-top padding-right padding-left flex-shrink tabs-flex">
      <div class="margin-bottom border-radius-xs padding-tb-xs padding-lr tabs-view">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tab-body">
      <transition-group name="el-fade-in-linear">
        <new-first-mv-comp v-if="activeName === 'newFirstMv'" key="newFirstMv"></new-first-mv-comp>
        <top-mv-comp v-else-if="activeName === 'topMv'" key="topMv"></top-mv-comp>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import newFirstMvComp from './components/newFirstMv'
  import topMvComp from './components/topMv'

  export default {
    name: "Mv",
    components: {newFirstMvComp, topMvComp},
    data() {
      return {
        updateId: +new Date(),
        activeName: 'newFirstMv',
        tabs: [
          {label: '最新', name: 'newFirstMv'},
          {label: '排行榜', name: 'topMv'},
        ]
      }
    },
    methods: {
      handleClick() {

      }
    },
    activated() {
      this.updateId = +new Date()
    }
  }
</script>

<style scoped lang="scss">
  .mv {
    height: 100%;
    display: flex;
    flex-direction: column;

    .tab-body {
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
  }
</style>
