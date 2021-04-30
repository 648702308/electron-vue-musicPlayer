<template>
  <div v-if="data.type==='a'" class="notice-item">
    <div class="notice-label" />
    <div class="">【缴费通知】{{ data.content }}。</div>
  </div>
  <div v-else-if="data.type==='b'" class="notice-item">
    <div class="notice-label" />
    <div class="">【员工审批通知】{{ data.content }}。</div>
  </div>
  <div v-else-if="data.type==='c'" class="notice-item">
    <div class="notice-label" />
    <div class="">【报销审批通知】{{ data.content }}。</div>
  </div>
</template>

<script>
export default {
  name: 'NoticeItem',
  props: {
    data: { type: Object, default: () => { return {} } }
  }
}
</script>

<style scoped lang="scss">
  .notice-item{
    padding: 15px;
    border-bottom: solid 1px #ddd;
    display: flex;
    font-size: 12px;
    line-height: 1.2;
  .notice-label{
    flex-shrink: 0;
  }
  }
</style>
