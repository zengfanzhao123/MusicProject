<template>
  <div id="app">
  <div>
    <top-head/>
    <bottom-head/>
  </div>
   <live2d
      :style="style"
      :model="['Potion-Maker/Pio', 'school-2017-costume-yellow']"
      :direction="direction"
      :size="size"
    ></live2d>
  </div>

</template>

<script>
import live2d  from 'vue-live2d'
import BottomHead from '@/components/BottomHead'
import TopHead from '@/components/TopHead'
export default {
  components: { TopHead,BottomHead,live2d  },
    name: 'App',
     data () {
    return {
      direction: 'right',
      style: 'z-index:10000;position: fixed; bottom: 0; right: 0;',
      width: 500,
      height: 500,
      size: 350,
      tips: {
        mouseover: [{
          selector: '.vue-live2d',
          texts: ['这样可以修改默认语句']
        }]
      }
    }
  },
  created () {
    // tips 未使用，可自行在组件绑定此参数，注意此参数只会初始化一次
    this.tips = this.customTips
  }

}
</script>

<style>
  .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border: none !important;
  }
      html {
       
        background-color: rgba(221, 226, 235,.7);
      }
      #app {
          box-shadow: 1px 1px 1px 1px rgba(221, 226, 235);
          display: flex;
          margin: 40px auto;
          height: 840px;
          width: 1300px;
          background-color: #fff;
          border-radius: 25px;
          font-size: 15px;
          font-weight: 500;
          box-sizing: border-box;
          overflow:hidden;
          
      }
      a {
        text-decoration: none;
        color: #333;
      }
      ul {
        list-style: none;
      }
        /* 视口宽度大于等于
        @media (min-width: 1500px) {
            #app {
                width: 1300px;
                margin: 40px auto;
            }
        }*/
      .el-tabs__nav-wrap::after {
        background-color: #fff !important;
      }
        #tab-first {
            font-size: 14px;
        }

/*滚动条样式*/
::-webkit-scrollbar-track-piece {

  background-color: #fff;
}
 
::-webkit-scrollbar {

  width: 9px;
  height: 9px;
}
 
::-webkit-scrollbar-thumb {

  border-radius: 5px;
  background-color: #fff;
  background-clip: padding-box;
  min-height: 28px;
 
}
 
::-webkit-scrollbar-thumb:hover {
  background-color: #fff;
}
</style>
