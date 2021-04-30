<template>
  <el-scrollbar class="scrollbar" v-loading="loadding">
    <div class="padding-right padding-left padding-bottom label-card" v-infinite-scroll="load">
      <div class="grid">
        <div class="col-5 margin-bottom" v-for="(item,index) in lists" :key="index">
          <div class="grid-content">
            <div class="border-radius-sm img-view">
              <img class="img" v-lazy="item.picUrl" alt="">
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
  import {djHot} from "@/api/apis";

  export default {
    name: "djPersonalize",
    data() {
      return {
        lists: [],
        loadding: false
      }
    },
    mounted() {
      this.getHotDj()
    },
    methods: {
      load() {
        if (!this.loadding) {
          this.getHotDj()
        }
      },
      getHotDj() {
        this.loadding = true
        djHot({limit: 10, offset: this.lists.length}).then(res => {
          if (res.code === 200) {
            setTimeout(async () => {
              this.loadding = await false
              res.djRadios.forEach(item => {
                this.lists.push(item)
              })
            }, 300)
          }
        })
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
