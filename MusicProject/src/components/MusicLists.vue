<template>
  <div class="searchResult">
            <div class="searchResult2">
                <div class="head">
                <span style="padding-right:348px;margin-left: 62px;">歌名</span><span style="padding-right:200px">歌手</span>
                <span style="padding-right:204px">专辑</span><span style="padding-right:40px">时长</span>
                </div>
                <ul>
                    <li v-for="s in tableData" :key="s.id" 
                    @dblclick="playmusic(s.id,s.dts,s.name,s.ar[0].name,s.dt,s.ar[0].id)">
                        <span style="width: 358px;fontSize:16px"><a href="javascript:;">{{s.name}}</a></span>
                        <span style="width: 210px;">
                        <a style="margin-right:10px" v-for="(ar,i) in s.ar" :key="i" @click="singerMs(ar.id)" href="javascript:;">{{ar.name}}</a>
                        </span>
                        <span style="width: 210px;"><a href="javascript:;">{{s.al.name}}</a></span>
                        <span style="width: 50px;"><a href="javascript:;">{{s.dts}}</a></span>
                    </li>
                </ul>

            </div>
</div>
</template>

<script>
import axios from "axios"
export default {
    name:'MusicLists',
    data() {
        return {
            tableData:[],

        }
    },
    methods:{
        // 播放音乐
        playmusic(id,dts,name,singer,dt,arid){
            this.$store.commit('PlayMusic',[{id,dts,name,singer,dt,arid}])
        },
            //歌手详情
        singerMs(id){
            this.$store.commit('SingerIdData',id)
            // console.log(id);
            setTimeout(()=>{
                this.$router.push({
                name:'SingerMess',
                query:{
                    id:this.$store.state.SingerId
                }
                })
            },500)
        },
    },
    mounted(){
        // 歌单详情
        axios.get("http://localhost:3000/playlist/detail", {
                params: {
                    id:this.$route.query.id
                }
            }).then(res => {
                // console.log(res.data.playlist.tracks);
                this.tableData = res.data.playlist.tracks;
                this.tableData.forEach((data)=>{
                    let m = parseInt(data.dt/1000 / 60 % 60)
                    m = m < 10 ? '0' + m : m
                    let s = parseInt(data.dt/1000 % 60)
                    s = s < 10 ? '0' + s : s
                    data.dts = `${m}:${s}`
                })
        })
    }
}
</script>

<style lang="less" scoped>
    .searchResult {
    width: 1023px;
    height: 690px;
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