<template>
  <el-scrollbar class="scrollbar" v-loading="loadding">
    <div class="padding-right padding-left padding-bottom label-card new-mv">
      <div class="grid">
        <div class="col-4 margin-bottom" v-for="(item,index) in lists" :key="index">
          <div class="grid-content">
            <div class="border-radius-sm img-view">
              <img class="img" v-lazy="item.picUrl" alt="">
            </div>
            <div class="margin-top-xs text-md">{{item.name}}</div>
            <div class="text-green text-sm">{{item.rcmdText}}</div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import {djPerfered} from "@/api/apis";

  export default {
    name: "perferedDj",
    data(){
      return{
        lists:[],
        loadding: false
      }
    },
    mounted() {
      this.getHotDj()
    },
    methods: {
      getHotDj() {
        this.loadding = true
        djPerfered().then(res => {
          if (res.code === 200) {
            setTimeout(async () => {
              this.loadding = await false
              this.lists = res.data
            }, 300)
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
