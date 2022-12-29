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
  components: { TopHead,BottomHead },
    name: 'App',
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
