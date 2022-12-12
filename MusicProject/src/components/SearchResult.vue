<template>
          <!-- 搜索返回的列表 -->
        <div class="searchResult">
            <div class="searchResult2">
            <h1>{{$route.query.value}}</h1>
            <el-tabs  v-model="activeName">
                <el-tab-pane label="热门歌曲" name="first">
                <div class="head">
                <span style="padding-right:348px;margin-left: 37px;">歌名</span><span style="padding-right:200px">歌手</span>
                <span style="padding-right:204px">专辑</span><span style="padding-right:40px">时长</span>
                </div>
                <ul>
                    <li v-for="s in tableData" :key="s.id" 
                    @dblclick="playmusic(s.id,s.dts,s.name,s.ar[0].name,s.dt,s.ar[0].id)">
                        <span style="width: 358px;fontSize:16px"><a href="javascript:;">{{s.name}}</a></span>
                        <span style="width: 210px;"><a style="margin-right:10px" v-for="(ar,i) in s.ar" :key="i" @click="singerMs(ar.id)" href="javascript:;">{{ar.name}}</a></span>
                        <span style="width: 210px;"><a href="javascript:;">{{s.al.name}}</a></span>
                        <span style="width: 50px;"><a href="javascript:;">{{s.dts}}</a></span>
                    </li>
                </ul>
                </el-tab-pane>
                <el-tab-pane label="歌单" name="second">暂无信息</el-tab-pane>
                <el-tab-pane label="MV" name="third">暂无信息</el-tab-pane>
                <el-tab-pane label="专辑" name="fourth">暂无信息</el-tab-pane>
            </el-tabs>
            </div>
        </div>
</template>

<script>
import axios from "axios"
import pubsub from 'pubsub-js'
export default {
    name:'SearchResult',
    data() {
        return {
            activeName:'first',
            tableData:[],
        }
    },
    methods:{
           //歌手详情
        singerMs(id){
            this.$store.commit('SingerIdData',id)
            setTimeout(()=>{
                this.$router.push({
                name:'SingerMess',
                query:{
                    id:this.$store.state.SingerId
                }
                })
            },500)
        },
        //播放
        playmusic(id,dts,name,singer,dt,arid){
            this.$store.commit('PlayMusic',[{id,dts,name,singer,dt,arid}])
            // console.log([{id,dts,name,singer,dt,arid}]);
        },
        //搜索
        searchList(){
            axios.get(`http://www.fzapi22.tk/cloudsearch?keywords=${this.$route.query.value}`).then((result) => {
                // console.log("搜索请求成功",result.data);
                this.tableData = result.data.result.songs
                //遍历一下时间
                this.tableData.forEach((data)=>{
                    let m = parseInt(data.dt/1000 / 60 % 60)
                    m = m < 10 ? '0' + m : m
                    let s = parseInt(data.dt/1000 % 60)
                    s = s < 10 ? '0' + s : s
                    data.dts = `${m}:${s}`
                })
            })
        },
        //收藏
        collectmusic(id){
            console.log('收藏',id);
        },

    },
    mounted(){
    },
    beforeDestroy(){
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
        padding: 35px 20px 20px 20px;
        
        width: 100%;
        color: rgb(82 91 114);
        .head {
            font-size: 14px;
            display: flex;
            span {
                padding-right: 124px;
                
            }

           
        }
            ul {
                padding-left: 38px;
                 li {
                    float: left;
                    padding: 12px 0;
                    


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