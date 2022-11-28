<template>
  <div class="searchResult">
            <div class="searchResult2">

                <el-table :data="tableData" style="width: 100%" >
                <el-table-column prop="programName" label="歌名" width="280" />
                <el-table-column prop="content" label="热评" width="280"/>
                <el-table-column prop="dts" label="时长" width="100"/>
                <el-table-column label="播放">
                    <template #default="scope">
                    <!-- scope整个表格数据 -->
                    <el-button @click="playmusic(scope.row)" 
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
import axios from "axios"
export default {
    name:'PlayRadio',
    data() {
        return {
            tableData:[],

        }
    },
    methods:{
        // 播放音乐
        playmusic(scope){
            axios.get("http://localhost:3000/song/url", {
                params: {
                rid:this.$route.query.id
                }
            }).then(res => {
                alert('暂无接口')
                })
        },
    },
    mounted(){
        // 歌单详情
        axios.get("http://localhost:3000/dj/detail", {
                params: {
                    rid:this.$route.query.id
                }
            }).then(res => {
                this.tableData = res.data.data.commentDatas;
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

    .searchResult2 {
        padding: 35px 20px 20px 20px;
        overflow: scroll;
        width: 100%;
    }
}
</style>