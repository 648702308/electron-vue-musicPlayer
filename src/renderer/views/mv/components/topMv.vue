<template>
  <el-scrollbar class="scrollbar" v-loading="loadding">
    <div class="padding-right padding-left padding-bottom label-card new-mv">
      <div class="margin-bottom text-right">
      <span v-for="(item,index) in areas"
            :key="index" class="pointer hover-gradual-red area-tag"
            :class="{'bg-gradual-red':areaActive === item.name}"
            @click="areaTagHeader(item)">{{item.label}}</span>
      </div>
      <div class="grid no-gutter padding-lr">
        <div class="col-2 border" v-for="(item,index) in lists" :key="index">
          <div class="padding flex align-center grid-content">
            <div class="flex-shrink padding-right flex flex-direction align-center justify-center">
              <span class="text-lg">{{rankNum(index+1)}}</span>
              <div>
                <i v-if="(index+1)!==item.lastRank"
                   class="text-sm"
                   :class="{'el-icon-bottom text-red':(index+1)>item.lastRank,'el-icon-top text-green':(index+1)<item.lastRank}"></i>
                <span class="text-sm text-gray" v-else>--</span>
              </div>
            </div>

            <div class="flex-shrink border-radius-sm img-view">
              <img class="img" v-lazy="item.cover" alt="">
            </div>
            <div class="padding-left info-view">
              <div class="margin-top-xs text-md">{{item.name}}</div>
              <div class="text-green margin-top text-sm">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import {topMv} from "@/api/apis";

  export default {
    name: "topMv",
    data() {
      return {
        lists: [],
        loadding:false,
        finished:false,
        areaActive: '',
        areas: [
          {label: '全部', name: '全部'},
          {label: '内地', name: '内地'},
          {label: '港台', name: '港台'},
          {label: '欧美', name: '欧美'},
          {label: '日本', name: '日本'},
          {label: '韩国', name: '韩国'},
        ]
      }
    },
    mounted() {
      this.getLists()
    },
    methods: {
      getLists() {
        this.loadding = true
        topMv({area: this.areaActive,limit: 30}).then(res => {
          if (res.code === 200) {
            setTimeout(async () => {
              this.loadding = await false
              this.lists = res.data
            }, 300)
          }
        }).catch((err)=>{
          this.loadding = false
        })
      },
      areaTagHeader(item) {
        if(item.name !== '全部'){
          this.areaActive = item.name
          this.lists = []
          this.getLists()
        }else{
          console.log('全部')
        }
      },
      rankNum(number){
        if(number<10){
          return `0${number}`
        }else{
          return number
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .label-card {
    .area-tag {
      display: inline-block;
      padding: 3px 10px;
      font-size: 12px;
      border-radius: 4px;
      height: 20px;
      line-height: 14px;
      & + .area-tag {
        margin-left: 10px;
      }
    }
    .border {
      position: relative;
      .grid-content {
        &:after {
          content: " ";
          width: 200%;
          height: 200%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: inherit;
          transform: scale(0.5);
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
        }
        &:before {
          content: " ";
          width: 200%;
          height: 200%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: inherit;
          transform: scale(0.5);
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
        }
      }
      &:nth-child(even) .grid-content::after {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
      }
      &:nth-child(n+3) .grid-content::after {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .grid-content {
      height: 140px;
      .img-view {
        width: 200px;
        height: 110px;
      }
      .info-view {
        height: 100%;
      }
    }
  }
</style>
