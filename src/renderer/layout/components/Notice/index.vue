<template>
  <div class="notice-container">
    <div class="notice-body">
      <h3 class="notice-title"><span>消息</span>
        <span class="close-btn pointer" @click="closeNotice"><i class="el-icon-close" /></span>
      </h3>
      <div
        ref="noticeContent"
        v-loading="loading"
        element-loading-text="请给我点时间！"
        class="notice-content"
        :style="{height: height+'px'}"
      >
        <div class="no-notices" v-if="!list.length">暂无消息！</div>
        <notice-item v-for="(item,index) in list" :key="index" :data="item" />
      </div>
      <pagination
        v-show="total>0"
        :total="total"
        small
        align="center"
        :background="false"
        :pager-count="5"
        :layout="listQuery.layout"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import noticeItem from './noticeItem.vue'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  inject: ['loadMessageNum'], // 注入App.vue组件提供（provide）的 reload 依赖
  components: { noticeItem, Pagination },
  data() {
    return {
      height: 50,
      listQuery: {
        page: 1,
        limit: 10,
        layout: 'prev, pager, next'
      },
      list: [],
      total: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'notice'
    ])
  },
  watch: {
    notice: function(val) {
      if (val) {
        this.$nextTick(function() {
          this.height = window.innerHeight - this.$refs.noticeContent.offsetTop - 150
        })
      }
    }
  },
  methods: {
    // 关闭
    closeNotice() {
      this.$store.dispatch('common/showNotice', this.notice)
    }

  }
}
</script>

<style scoped lang="scss">
  .notice-container {
    word-wrap: break-word;

    .notice-title {
      margin: 0;
      color: rgba(0, 0, 0, .85);
      font-size: 16px;
      line-height: 22px;
      position: relative;
      font-weight: bold;
      border-bottom: solid 1px #ddd;
      padding: 15px;
      .close-btn{
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        right: 15px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-icon-close{
          font-size: 18px;
          font-weight: bold;
        }
      }
    }

    .notice-content {
      .no-notices{
        font-size: 12px;
        text-align: center;
        padding: 15px;
      }
      overflow: hidden;
      overflow-y: auto;
    }
  }
</style>
