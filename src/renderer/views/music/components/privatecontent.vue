<template>
  <div class="label-card new-mv" v-if="lists.length">
    <div class="flex align-center margin-tb text-xl text-bold label-title">独家放送 <i
        class="margin-left-xs el-icon-arrow-right"></i></div>
    <div class="grid">
      <div class="col-3 margin-bottom" v-for="(item,index) in lists" :key="index">
        <div class="grid-content">
          <div class="pointer border-radius-sm img-view">
            <img class="img" :src="item.sPicUrl" alt="">
          </div>
          <div class="pointer margin-top-xs text-md">{{item.name}}</div>
          <div class="text-green text-sm">{{item.artistName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {privatecontent} from "@/api/apis";

  export default {
    name: "privatecontent",
    data() {
      return {
        lists: [],
      }
    },
    mounted() {
      this.getPrivatecontent()
    },
    methods: {
      getPrivatecontent() {
        privatecontent({limit: 3}).then(res => {
          if (res.code === 200) {
            this.lists = res.result
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss"></style>
