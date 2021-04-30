<template>
  <div class="label-card new-mv" v-if="lists.length">
    <div class="flex align-center margin-tb text-xl text-bold label-title">推荐MV <i
        class="margin-left-xs el-icon-arrow-right"></i></div>
    <div class="grid">
      <div class="col-3 margin-bottom" v-for="(item,index) in lists" :key="index">
        <div class="grid-content">
          <div class="pointer border-radius-sm img-view">
            <img class="img" :src="item.picUrl" alt="">
          </div>
          <div class="pointer margin-top-xs text-md">{{item.name}}</div>
          <div class="text-green text-sm">{{item.artistName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {personalizedMv} from "@/api/apis";

  export default {
    name: "personalizedMv",
    data() {
      return {
        lists: [],
      }
    },
    mounted() {
      this.getTuijianMv()
    },
    methods: {
      getTuijianMv() {
        personalizedMv().then(res => {
          if (res.code === 200) {
            if (res.result.length > 3) {
              this.lists = res.result.slice(0, 3)
            } else {
              this.lists = res.result
            }
          }
        })
      },
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
