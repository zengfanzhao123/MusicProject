<template>
  <div class="searchResult">
            <div class="searchResult2">
                <div class="head">
                <span style="padding-right:348px;margin-left: 62px;">歌名</span><span style="padding-right:200px">歌手</span>
                <span style="padding-right:40px">时长</span>
                </div>
                <ul>
                    <li v-for="(s,i) in tableData" :key="i" 
                    @dblclick="playmusic(s)">
                        <span style="width: 358px;fontSize:16px"><a href="javascript:;">{{s.name}}</a></span>
                        <span style="width: 210px;">
                        <a style="margin-right:10px" @click="singerMs(s.arid)" href="javascript:;">{{s.singer}}</a>
                        </span>
                        <span style="width: 50px;"><a href="javascript:;">{{s.dts}}</a></span>
                    </li>
                </ul>

            </div>
</div>
</template>

<script>
export default {
    name:'PlaysList',
    data() {
        return {
            tableData:[],

        }
    },
    methods:{
        // // 播放音乐
        playmusic(s){
            this.$store.commit('PlayMusic',[s])
        },
            //歌手详情
        singerMs(id){
            if(id) {
                this.$store.commit('SingerIdData',id)
                    setTimeout(()=>{
                        this.$router.push({
                        name:'SingerMess',
                        query:{
                            id:this.$store.state.SingerId
                        }
                        })
                    },500)
            } else {
                alert('无该歌手信息')
            }
            
        },
    },
    mounted(){
        this.tableData = JSON.parse(localStorage.getItem('playSongList')) || []
        
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
overflow: scroll;
    .searchResult2 {
        padding: 35px 20px 20px 0;
        
        width: 100%;
        color: rgb(82 91 114);
        .head {
            font-size: 14px;
            span {
                padding-right: 124px;
                
            }

           
        }
            ul {
                
                 li {
                    float: left;
                    padding: 12px 20px;
                    border-radius: 5px;
                    span {
                        float: left;
                        display: block;
                        width: 135px;
                        padding-right: 20px;
                        color: rgb(82 91 114);
                    }

                }
                li:hover {
                    background-color: rgb(242, 243, 247);
                }
            }
    }
}
</style>