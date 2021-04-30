<template>
  <el-scrollbar class="scrollbar">
    <div class="view home-container">
      <!--banner-->
      <carousel-comp></carousel-comp>
      <!--推荐歌单-->
      <personalized-comp></personalized-comp>
      <!--独家放送-->
      <privatecontent-comp></privatecontent-comp>
      <!--推荐MV-->
      <personalized-mv-comp></personalized-mv-comp>
      <!--推荐电台-->
      <djprogram-comp></djprogram-comp>
    </div>
  </el-scrollbar>
</template>

<script>
  import {LoginStatus,userSubcount, loginRefresh} from '@/api/apis'
  import carouselComp from './components/banner'
  import personalizedComp from './components/personalized'
  import privatecontentComp from './components/privatecontent'
  import personalizedMvComp from './components/personalizedMv'
  import djprogramComp from './components/djprogram'

  export default {
    name: 'Home',
    components: {carouselComp, personalizedComp, privatecontentComp, personalizedMvComp, djprogramComp},
    data() {
      return {
        newsongLists: [],
        privatecontentLists: [],
        tuijianpMvLists: [],
        djLists: [],
      }
    },
    computed: {},
    created() {
    },
    mounted() {

    },
    destroyed() {
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .home-container {
  }
</style>
