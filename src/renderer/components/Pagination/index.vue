<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <table style="width: 100%;">
      <tr>
        <td class="yui-table-head"><slot name="totalPrice" /></td>
        <td class="yui-table-head" style="text-align: right">
          <el-pagination
            :small="small"
            :style="{textAlign: align}"
            :background="background"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :pager-count="pagerCount"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: [Number, String],
      default: 1
    },
    small: {
      type: Boolean,
      default: false
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    limit: {
      type: [Number, String],
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    currentPage: {
      get() {
        return Number(this.page)
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return Number(this.limit)
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 0 15px;
}
.pagination-container.hidden {
  display: none;
}
</style>
