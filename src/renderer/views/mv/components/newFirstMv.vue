<template>
  <el-scrollbar class="scrollbar" v-loading="loadding">
    <div class="padding-right padding-left padding-bottom label-card new-mv">
      <div class="margin-bottom text-right">
          <span v-for="(item,index) in areas"
                :key="index" class="pointer hover-gradual-red area-tag"
                :class="{'bg-gradual-red':areaActive === item.name}"
                @click="areaTagHeader(item)">{{item.label}}</span>
      </div>
      <div class="grid">
        <div class="col-3 margin-bottom col-grid" v-for="(item,index) in lists" :key="index">
          <div class="grid-content">
            <div class="border-radius-sm img-view">
              <img class="img" v-lazy="item.cover" alt="">
            </div>
            <div class="margin-top-xs text-md">{{item.name}}</div>
            <div class="text-green text-sm">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import {newMv} from "@/api/apis";

  export default {
    name: "NewFirstMv",
    data() {
      return {
        lists: [],
        loadding: false,
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
      this.getDatas()
    },
    methods: {
      getDatas() {
        this.loadding = true
        newMv({area: this.areaActive}).then(res => {
          if (res.code === 200) {
            setTimeout(()=>{
              this.lists = res.data
              this.loadding = false
            },300)
          }
        })
      },
      areaTagHeader(item) {
        if (item.name !== '全部') {
          this.areaActive = item.name
          this.lists = []
          this.getDatas()
        } else {
          console.log('全部')
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
    .col-grid{
      .img-view{
        position: relative;
        padding-top: 56%;
        .img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
