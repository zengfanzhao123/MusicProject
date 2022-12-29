<template>
<div class="searchResult">
            <div class="searchResult2">
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
import {radioSet,music} from '@/http/api'
export default {
    name:'PlayRadio',
    data() {
        return {
            tableData:[],
        }
    },
    methods:{
        // 播放电台
       playmusic(id,dts,name,singer,dt){
        console.log(id,dts,name,singer,dt);
            this.$store.commit('PlayMusic',[{id,dts,name,singer,dt}])
        },
    },
    mounted(){
        const arr = []
        // 电台详情
        radioSet.getRadioProgram(this.$route.query.id).then(res => {
            // console.log(res.data.programs[0]);
            res.data.programs.forEach((e,i) => {
                music.getSongDetail(e.mainTrackId).then(res2 => {
                    // console.log(res2.data.songs[0]);
                    const data = res2.data.songs[0]
                        let m = parseInt(data.dt/1000 / 60 % 60)
                        m = m < 10 ? '0' + m : m
                        let s = parseInt(data.dt/1000 % 60)
                        s = s < 10 ? '0' + s : s
                        data.dts = `${m}:${s}`
                        data.name = res.data.programs[i].name
                        data.ar[0].name = res.data.programs[i].dj.brand
                        // data.ar[0].id = res.data.programs[i].dj.userId
                    arr.push(res2.data.songs[0])
                    // console.log(arr);
                })
            });
        })
         this.tableData = arr   
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