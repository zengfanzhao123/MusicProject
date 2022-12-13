<template>
  <div>
    <top-head/>
    <bottom-head/>
  </div>
</template>

<script>
import BottomHead from '@/components/BottomHead'

import TopHead from '@/components/TopHead'


export default {
  components: { TopHead,BottomHead },
  name: 'HomeIndex',
}
</script>
<style>
  .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border: none !important;
  }
</style>