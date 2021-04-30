<template>
  <div class="carousel-view">
    <el-carousel :interval="4000" type="card" height="160px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="border-radius-md banner-img-view">
          <img class="banner-img" :src="item.pic" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import {banner} from "@/api/apis";

  export default {
    name: "banner",
    data() {
      return {
        banners: [],
      }
    },
    mounted() {
      this.getBanner()
    },
    methods: {
      // banner
      getBanner() {
        banner({type: 3}).then(res => {
          if (res.code === 200) {
            this.banners = res.banners
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .banner-img-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 0;
    .banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
