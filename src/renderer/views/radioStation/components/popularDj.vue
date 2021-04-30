<template>
  <el-scrollbar class="scrollbar" v-loading="loadding">
    <div class="padding-right padding-left padding-bottom label-card">
      <div class="grid">
        <div class="col-5 margin-bottom" v-for="(item,index) in lists" :key="index">
          <div class="grid-content">
            <div class="border-radius-sm img-view">
              <img class="img" v-lazy="item.avatarUrl" alt="">
            </div>
            <div class="text-green text-md">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
  import {djPopular} from "@/api/apis";

  export default {
    name: "popularDj",
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
        djPopular({limit: 100}).then(res => {
          if (res.code === 200) {
            setTimeout(async () => {
              this.loadding = await false
              res.data.list.forEach(item => {
                this.lists.push(item)
              })
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
