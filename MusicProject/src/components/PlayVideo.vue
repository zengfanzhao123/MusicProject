<template>
  <div class="playVideo">
    <div class="playVideo1">
        <video controls poster  ref="mvurl"  :src="videoUrl"></video>
        <h2>{{name}}</h2><h2 style="padding:0 10px">-</h2><h2 style="color: rgba(0, 0, 0,.5);">{{artistName}}</h2>
        <span></span>
    </div>

  </div>
</template>

<script>
import axios from "axios"
import PubSub from 'pubsub-js'
export default {
    name:'PlayVideo',
    data() {
        return {
            videoUrl:'',
            name:'' || '暂无视频信息',
            artistName:'' || '暂无视频信息',
        }
    },
    methods:{
        playurl(_,data){
            this.videoUrl = data[0]
            this.$refs.mvurl.src = this.videoUrl
            this.name = data[1]
            this.artistName = data[2]
        }
    },
    mounted(){
        this.pidpv = PubSub.subscribe('PlayVideo',this.playurl)

    },
    beforeDestroy(){
        PubSub.unsubscribe(pidpv)
    }
}
</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}
.playVideo{
    width: 1023px;
    height: 690px;
    position: absolute;
    background-color: #fff;
    z-index: 998;
    top: 100%;
    right: 0;
    .playVideo1 {
        padding: 10px;
            video {
                width: 1000px;
                border-radius: 5px;
            }
            h2 {
                
                display: inline-block;
            }
    }

    
}
</style>