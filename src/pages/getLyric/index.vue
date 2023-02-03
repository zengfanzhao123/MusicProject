<template>
    <div class="searchResult">
            <div class="searchResult2">
            <div class="let"><img :src="songimg" alt=""></div>
            <div class="right" style="padding-right:20px">
                <h1>{{songname}}</h1>
                <div class="ofly">
                    <div class="ly">
                        <p v-for="(lyric,key) in lyricObj" :key="key" :ref="key">{{lyric}}</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name:"getLyric",
    data() {
        return {
            lyricObj:null,
            songname:null,
            songimg:'',
            currentTime:0
        }
    },
    methods:{
        getly(){
                const lyt = setInterval(() =>{
                    this.lyricObj = this.$store.state.lyricObj
                    this.songname = this.$store.state.musicObj.name
                    this.songimg = this.$store.state.songImg
                    this.currentTime = Math.floor(this.$store.state.currentTime)
                    if(this.lyricObj) {
                        let data = this.lyricObj
                        for(let i in data){
                            //通过对比key和播放时间判断是否添加歌词样式
                            if(this.currentTime == i){
                                //如果添加过样式且该歌词不为空，则删除之前的样式，当前歌词添加上样式
                                if(document.querySelector('.action') && this.$refs[i][0].innerText!=='')document.querySelector('.action').classList.remove('action')
                                this.$refs[i][0].className = 'action'
                                // 滚动显示歌词
                                document.querySelector('.ofly').scrollTop = this.$refs[i][0].offsetTop - 300
                            }
                        }
                    }
                },500)
        },
    },
    mounted(){
       this.getly()
    }
}
</script>

<style lang="less" scoped>
  .searchResult {
    width: 1023px;
    height: 699px;
    position: absolute;
    background-color: #fff;
    z-index: 998;
    top: 100%;
    right: 0;
    .searchResult2 {
        display: flex;
        padding: 35px 20px 20px 0;
        width: 100%;
        color: rgb(82 91 114);
        .let {
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            img {
                width: 250px;
                border: 1px solid rgba(221, 226, 235,.7);
            }
        }
        .right {
            flex: 1;
            h1 {
                display: block;
                width: 400px;
            }
            .ofly {
                height: 500px;
                overflow: scroll;
                .ly {
                    width: 100%;
                    height: 100%;
                    .action {
                        color: #000;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
            }
            
        }
    }
  }
</style>