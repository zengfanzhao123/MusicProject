<template>
<div class="searchResult">
    <div class="searchResult2">
        <!-- 轮播图 -->
        <div class="slideshow">
            <carousel/>
        </div>
        <h1 style="margin-top: 138px;">今日推荐</h1>
        <!-- <div class="bgMsg"> -->
                    <li>
                        <div class="one">
                            <a href="javascript:;" @click="recommendBtn"><img :src="imgurl" alt="请先登录" class="three">
                                <div class="two"><img src="@/assets/cover_play.56974e6f.png" alt=""></div>
                                <div class="ing"></div>
                            </a>
                        </div>
                        <span  style="margin-left:20px;fontSize:16px;color:#000">每日推荐</span>
                    </li>    
                    <li>
                        <div class="one">
                            <a href="javascript:; " @click="songBankIdBtn"><img :src="imgurl2" class="three">
                                <div class="two"><img src="@/assets/cover_play.56974e6f.png" alt=""></div>
                                <div class="ing"></div>
                            </a>
                        </div>
                        <span  style="margin-left:20px;fontSize:16px;color:#000">{{msg}}</span>
                    </li>               

        </div>
    <!-- </div> -->
</div>
</template>

<script>
import carousel from '@/components/carousel'
import { rec } from '@/http/api'
export default {
    name:'indexHome',
    components:{carousel},
    data() {
        return {
            RecObj:'',
            imgurl:'',
            RecDatil:'',
            imgurl2:'',
            msg:"",
            DatilId:''
        }
    },
    methods:{
                // 歌单，跳转详情
        songBankIdBtn(){
            this.$router.push({
                name:'MusicLists',
                query:{
                    id:this.DatilId
                }
            })
        },
        //
        recommendBtn(){
            this.$router.push({
                name:'recommend',
                query:{
                    obj:this.RecObj
                }
            })
        }
    },
    mounted(){
        //推荐
        const cookie = this.$cookieStore.getCookie( 'cookiename')
        rec.getRecSong(cookie).then(res=>{
            this.RecObj = res.data.data.dailySongs
            this.imgurl = this.RecObj[0].al.picUrl + '?param=448y224'
        })
        rec.getRecDatil(cookie).then(res=>{
            // console.log(res.data.recommend);
            this.RecDatil = res.data.recommend
            this.imgurl2 = res.data.recommend[1].picUrl + '?param=448y224'
            this.msg = res.data.recommend[0].name
            this.DatilId = res.data.recommend[0].id
        })
    }
}
</script>

<style lang="css" scoped>
    .searchResult {
        box-sizing: border-box;
        width: 1023px;
        height: 699px;
        position: absolute;
        background-color: #fff;
        z-index: 998;
        top: 100%;
        right: 0;
        padding: 20px 20px 20px 20px;
        
    }
    .searchResult2 {
        
        width: 100%;
        color: rgb(82 91 114);
    }
    .slideshow {
        display: flex;
        flex: 1;
        width: 1022px;
        height: 200px;
        
    }
    a img {
        height: 224px;
        width: 448px;
        margin-bottom: 10px;
        transition: all 0.5s;
        border-radius: 20px;
    }
    
    li {
        list-style: none;
        position: relative;
        float: left;
        width: 448px;
        height: 224px;
        padding: 8px;
        font-size: 14px;
        color: #999;
        border-radius: 20px;

    }
    
    li:nth-child(5) {
        margin-right: 0;
    }
    
    li a {
        font-size: 14px;
        border-radius: 20px;
    }
    
    li:hover a {
        color: #31c27c;
        border-radius: 20px;
    }
    
    .two {
        position: absolute;
        top: 50%;
        right: 40%;
        width: 49px;
        transform: translate(-50%, -50%);
        opacity: 0;
        z-index: 2;
        transition: all 0.5s;
    }
    
    .two img {
        height: 49px;
        width: 49px;
    }
    
    .one:hover .two {
        opacity: 1;
    }
    
    .one:hover .three {
        transform: scale(1.2);
    }
    
    ul li a .ing {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 448px;
        height: 224px;
        background-color: rgba(0, 0, 0, .3);
        opacity: 0;
        transition: all 0.5s;
        border-radius: 20px;
    }
    
    .one {
        width: 448px;
        height: 224px;
        overflow: hidden;
        border-radius: 20px;
    }
    
    .one:hover .ing {
        opacity: 1;
        border-radius: 20px;
    }

    .bgMsg {
        float: left;
        background-color: pink;
        height: 240px;
        width: 900px;
        margin-left: 20px;
    }
</style>