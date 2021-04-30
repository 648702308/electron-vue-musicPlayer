<template>
  <div class="label-card" v-if="lists.length">
    <div class="flex align-center margin-tb text-xl text-bold label-title">推荐电台 <i
        class="margin-left-xs el-icon-arrow-right"></i></div>
    <div class="grid">
      <div class="col-6 margin-bottom" v-for="(item,index) in lists" :key="index">
        <div class="grid-content">
          <div class="pointer border-radius-sm img-view">
            <img class="img"  v-lazy="item.picUrl" alt="">
          </div>
          <div class="pointer margin-top-xs text-md">{{item.name}}</div>
          <div class="text-green text-sm">{{item.artistName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {djprogram} from "@/api/apis";
  export default {
    name: "djprogram",
    data() {
      return {
        lists: [],
      }
    },
    mounted() {
      this.getDjprogram()
    },
    methods: {
      getDjprogram() {
        djprogram().then(res => {
          if (res.code === 200) {
            this.lists = res.result
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .new-mv {
    .img-view {
      height: 160px;
    }
  }
</style>
