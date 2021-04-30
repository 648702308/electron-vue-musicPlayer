<template>
  <div class="label-card recommend-song" v-if="lists.length">
    <div class="flex align-center margin-tb text-xl text-bold ">
      <span class="label-title lineht-1">推荐歌单</span>
      <i class="margin-left-xs el-icon-arrow-right lineht-1"></i></div>
    <div class="grid">
      <div class="col-5 margin-bottom" v-for="(item,index) in lists" :key="index">
        <div class="grid-content">
          <div class="pointer border-radius-sm img-view" @click="tapNameHeader(item)">
            <img class="img" v-lazy="item.picUrl" alt="">

            <div class="play-num">
              <i class="iconfont icon-play"></i>
              <span>{{item.playCount|formatPlayCount}}</span>
            </div>
            <div class="play-btn" @click.stop="playSongSheet(item)">
              <i class="iconfont icon-play--filled--alt"></i>
            </div>
          </div>
          <div class="pointer margin-top-sm text-md hover-color-red" @click="tapNameHeader(item)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {recommendSong} from "@/api/apis";
  export default {
    name: "personalized",
    data() {
      return {
        lists: [],
      }
    },
    mounted() {
      this.getPersonalized()
    },
    methods: {
      getPersonalized() {
        recommendSong({limit: 10}).then(res => {
          if (res.code === 200) {
            this.lists = res.result
          }
        })
      },
      // 点击名称
      tapNameHeader(item){
        this.$router.push({name:'PlayList',params:{id:item.id}})
      },
      // 点击播放全部
      playSongSheet(item){
        console.log(99)
      }
    }
  }
</script>

<style scoped lang="scss">
  .recommend-song {
    .img-view {
      /*height: 160px;*/
      overflow: hidden;
      position: relative;
      &:hover{
        .play-btn{
          opacity: 1;
        }
      }
    }
    .play-num{
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      color: #fff;
      padding: 5px 10px;
      .iconfont{
        font-size: 12px;
      }
    }
    .play-btn{
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      width: 30px;
      height: 30px;
      background-color: rgba(255,255,255,0.7);
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      margin: 5px 10px;
      opacity: 0;
      transition: all 0.3s;
    }
  }
</style>
