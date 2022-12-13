<template>
  <div class="searchResult">
        <div class="searchResult2">
            <div class="messbgc">
            <div class="left"><img :src="mess.cover"></div>
            <div class="right"><h2>{{mess.name}}</h2></div>
            <p>{{mess.briefDesc}}</p>
                
            </div>
            <el-table :data="tableData" style="width: 100%" >
                <el-table-column prop="name" label="歌名" width="280" />
                <el-table-column prop="al.name" label="专辑" width="280"/>
                <el-table-column prop="dts" label="时长" width="100"/>
                <el-table-column label="播放">
                    <template #default="scope">
                    <!-- scope整个表格数据 -->
                    <el-button @click="playmusic(scope.row.id,scope.row.dts,scope.row.name,scope.row.ar[0].name,scope.row.dt,scope.row.ar[0].id)" 
                    size="0"  style="border:none;padding:1px" circle><i style="fontSize:25px" class="el-icon-video-play"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="收藏">
                    <template #default="scope">
                    <el-button @click="collectmusic(scope.row.id)" size="0"  style="border:none;padding:1px" circle><i style="fontSize:25px" class="el-icon-star-off"></i></el-button>
                    </template>
                </el-table-column>
                </el-table>

        </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name:'SingerMess',
    data() {
        return {
            mess:'',
            messTag:'',
            tableData:[]
        }
    },
    methods:{
          //播放
        playmusic(id,dts,name,singer,dt,arid){
            this.$store.commit('PlayMusic',[{id,dts,name,singer,dt,arid}])
        },
    },
    mounted(){
        //歌手详情
        // console.log(this.$route.query.id);
        axios.get('http://www.fzapi22.tk/artist/detail',{
            params:{
                id:this.$route.query.id
            }
        }).then(res => {
            // console.log(res.data);
            this.mess = res.data.data.artist
            this.mess.cover = `${this.mess.cover}?param=220y220`
            // console.log(this.mess);
        })
        //歌手热门音乐
        axios.get('http://www.fzapi22.tk/artist/top/song',{
            params:{
                id:this.$route.query.id
            }
        }).then(res => {
            // console.log(res.data);
            this.tableData = res.data.songs
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
    height: 699px;
    position: absolute;
    background-color: #fff;
    z-index: 998;
    top: 100%;
    right: 0;
overflow: scroll;
    .searchResult2 {
        padding: 35px 20px 20px 20px;
        
        width: 100%;
        color: rgb(82 91 114);
        .messbgc {
            width: 990px;
            border-radius: 10px;
            .left {
                float: left;
                width: 250px;
                height: 250px;
                overflow: hidden;
                border-radius: 50%;
                img {
                    height: 250px;
                }
            }
            .right {
                float: left;
                margin-left: 50px;
                height: 100%;
                width: 100%;
                 h2 {
                    margin: 20px 30px;
                }
            }

                p {
                    float: left;
                    margin: 15px 3px;
                }
        }
    }
}
</style>