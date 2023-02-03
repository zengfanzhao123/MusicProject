<template>
  <div id="app">
  <div>
    <top-head/>
    <bottom-head/>
  </div>
  </div>

</template>

<script>
import BottomHead from '@/components/BottomHead'
import TopHead from '@/components/TopHead'
export default {
  components: { TopHead,BottomHead},
    name: 'App',
    mounted(){
      this.$store.state.thisVc = this
    }
}
</script>

<style>

</style>
