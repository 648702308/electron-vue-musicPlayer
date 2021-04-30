<template>
  <div class="radio-station" :key="updateId">
    <div class="padding-top padding-right padding-left flex-shrink tabs-flex">
      <div class="margin-bottom border-radius-xs padding-tb-xs padding-lr tabs-view">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tab-body">
      <transition-group name="el-fade-in-linear">
        <hot-dj-comp v-if="activeName === 'hot'" key="hot"></hot-dj-comp>
        <newcomer-dj-comp v-else-if="activeName === 'newcomer'" key="newcomer"></newcomer-dj-comp>
        <popular-dj-comp v-else-if="activeName === 'popular'" key="popular"></popular-dj-comp>
        <perfered-dj-comp v-else-if="activeName === 'perfered'" key="perfered"></perfered-dj-comp>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import hotDjComp from './components/hotDj'
  import newcomerDjComp from './components/newcomerDj'
  import popularDjComp from './components/popularDj'
  import perferedDjComp from './components/perferedDj'

  export default {
    name: "RadioStation",
    components: {hotDjComp,newcomerDjComp,popularDjComp,perferedDjComp},
    data() {
      return {
        updateId: +new Date(),
        activeName: 'perfered',
        tabs: [
          {label: '今日优选', name: 'perfered'},
          {label: '热门电台', name: 'hot'},
          {label: '最热主播榜', name: 'popular'},
          {label: '主播新人榜', name: 'newcomer'}
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
  .radio-station {
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
