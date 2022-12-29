<template>

<div class="block">
    <span class="demonstration"></span>
    <el-carousel height="300px" style="width:100%" >
      <el-carousel-item v-for="item in bannerObj" :key="item.bannerId">
        <h3 class="small"><img :src="item.pic"></h3>
      </el-carousel-item>
    </el-carousel>
  </div>

  
</template>
<script>
import { banner } from "@/http/api"
export default {
  data() {
    return {
      bannerObj:''
    }
  },
  methods:{

  },
  mounted(){
    banner.getBanner().then(res=>{
      this.bannerObj = res.data.banners
      this.bannerObj.forEach(e => {
        e.pic = e.pic + '?param=983y300'
      })
    })
  }
}
</script>
<style scoped>
.block {
    width: 983px;
    height: 300px;

}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
              
    img {
        height:100%;
        width: 100%;
    }
</style>