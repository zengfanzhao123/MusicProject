<template>
<div style="position: relative;">
      <div class="bottom">
        
        <!-- 左侧导航栏 -->
        <div class="leftSide">
            <div class="head">
                <div class="side-title" style="margin-top: 0px;">Logo 啾啾</div>
                <a href="#" @click="goHome"><i class="el-icon-guide"></i>每日推荐</a>
            </div>
             <div class="head">
                <div class="side-title">发现</div>
                <a @click="songBank" href="javascript:;"><i class="iconfont icon-yinle1"></i>乐库</a>
                <a @click="songVideo" href="javascript:;"><i class="iconfont icon-trim-video"></i>MV</a>
                <a @click="songRadio" href="javascript:;"><i class="iconfont icon-diantai"></i>电台</a>
                <a @click="songMenu" href="javascript:;"><i class="iconfont icon-bofangliebiao"></i>歌单</a>
             </div>
             <div class="head">
                <div class="side-title">我的音乐</div>
                <a href="javascript:;" @click="playsList">
                    <i class="el-icon-time"></i>
                    播放列表
                </a>                
                <a href="javascript:;" @click="musicLike">
                    <i class="el-icon-star-off"></i>
                    我喜欢的音乐
                </a>
            </div>
            <div class="head">
                <div class="side-title">我的歌单</div>
                
                <a v-for="(p,i) in this.$store.state.playlist" :key="i" href="javascript:;" @click="getuserplaylist(p.id)">
                    <img :src="p.coverImgUrl" style="margin-right:5px" alt="">
                    <span>{{p.name}}</span>
                </a>
            </div>

        </div>
        <!-- 右侧列表 -->
        <div class="rightList">
                <div class="load" v-if="this.$store.state.loading">
                    <div class="loading"><loading/></div>
                </div>

             <div class="rightBottom">
                <el-empty description="更多功能请登录" style="margin-left: 350px;"  :image-size='200'></el-empty>
             <!-- 播放器 -->
             <div class="playerBox">
                <!-- 音乐封面 -->
                <img :src="songPlayImg" ref="playerBoxImg" alt="">
                <div class="songTop">
                <!-- 歌曲名 -->
                    <a href="javascript:;" @click="getlyric" style="width:260px;height:48px">{{musicObj.name}}</a>
                    <!-- 上一首 -->
                    <a href="javascript:;" @click="previous" style="margin-left: 56px;"><i class="iconfont icon-shangyishou"></i></a>
                    <!-- 暂停播放 -->
                    <a href="javascript:;" @click="apause" v-show="songPlay"><i class="el-icon-video-pause"></i></a>
                    <!-- 播放 -->
                    <a href="javascript:;" @click="aplay" v-show="!songPlay"><i class="el-icon-video-play"></i></a>
                    <!-- 下一首 -->
                    <a href="javascript:;" @click="next"><i class="iconfont icon-xiayishou"></i></a>
                    <!-- 重新播放 -->
                    <a href="javascript:;" @click="rework" style="margin-left: 150px;">
                    <i class="iconfont icon-shuaxin" style="fontSize:25px"></i></a>
                    <!-- 播放列表 -->
                    <a href="javascript:;" @click="playlist"><i class="el-icon-s-operation" style="fontSize:20px"></i></a>
                    <!-- 音量 -->
                    <a href="javascript:;"  v-show="vsVolume" @click="songVolume" style="margin-left: 10px;">
                    <i class="iconfont icon-jiadayinliang" style="fontSize:20px"></i></a>
                    <!-- 静音 -->
                    <a href="javascript:;" v-show="!vsVolume" @click="mute" style="margin-left: 10px;">
                    <i class="iconfont icon-guanbiyinliang" style="fontSize:20px"></i></a>
                    <!-- 音量条 -->
                    <div class="volumeBig" v-show="vsVolume"><a @click="huds($event)" href="javascript:;"><div ref="hudsColor" class="volumeMin"></div></a></div>
                    <audio :src="musicObj.url" ref="audio" id="audio"  @ended="next()" ></audio>
                </div>
                <div class="songBottom">
                    <a href="javascript:;" @click="singerMs(musicObj.arid)">{{musicObj.singer}}</a>
                    <div class="songTime"><span>{{ltime}}</span><div class="progress">
                    <a href="javascript:;" @click="progressBar($event)"><div  ref="playcolor" class="progressColor"></div></a>
                    </div><span>{{musicObj.dts}}</span></div>
                    <div class="playList"></div>
                </div>
             </div>
            </div>
        </div>
 
    </div>       
</div>
</template>

<script>
import loading from '@/components/Loading'
import pubsub from 'pubsub-js'
export default {
    name:'BottomHead',
    components:{loading},
    data() {
        return {
            songPlay:false,
            ltime:'00:00',
            vsVolume:true,
            surface:false,
            musicObj:'',
            songhots:'',
            songIdObj:[],
            num:0,
            songTime:'',
            n:0,
            flag:true,
        }
    },
    methods:{
        getuserplaylist(id){
            //使用中转页面跳转实现刷新路由
            let url = "MusicLists"
            this.$router.push({name:'transfer',query:{url,id}})
            // //歌单id
            // this.$router.push({
            //     name: 'MusicLists',
            //     query:{id}
            // })
        },
        getlyric(){
            this.$router.push({
                name: 'getLyric',
            })
        },
        visualSong2(){
            this.flag = true
        },
        // 可视化音频 
        visualSong(){
               this.flag = false
        },
        musicLike(){
            this.$router.push({
                name:'MusicLikeList',
            })
        },
        // 播放历史路由
        playsList(){
                this.$router.push({
                name:'PlaysList',
            })
        },
        // 上一首
        previous(){
            this.$refs.audio.autoplay = true
            if(this.num>=0) this.num--
            if(this.num<0) this.num = this.songIdObj.length-1
            this.$store.commit('PlayMusic',[this.songIdObj[this.num]])
            // console.log(this.num);
        },
        // 下一首
        next(){
            this.$refs.audio.autoplay = true
            if(this.num < this.songIdObj.length) this.num++
            if(this.num >= this.songIdObj.length) this.num = 0
            this.$store.commit('PlayMusic',[this.songIdObj[this.num]])
            // console.log(this.num,this.songIdObj.length-1);
        },
        playlist(){
            // this.$store.commit('Playlist')

        },
        //歌手详情
        singerMs(id){
            if(id){
                this.$router.push({
                    name:'SingerMess',
                    query:{
                        id
                    }
            })                
            } else {alert('无该歌手信息')}
            
            
        },
        // 路由电台
        songRadio(){
                this.$router.push({
                name:'SongRadio',
            })
        },
        //路由歌单
        songVideo(){
            this.$router.push({
                name:'SongVideo',
            })
        },
        //路由歌单
        songMenu(){
            this.$router.push({
                name:'SongMenu',
            })
        },
        //路由乐库
        songBank(){
            this.$router.push({
                name:'SongBank',
            })
        },
        //开始播放
        aplay(){
            //url为空读取本地存储
            this.$refs.audio.play()
            // console.log(this.$refs.audio.currentTime)
            this.songPlay = true
            this.songit() //调用播放时间
            
        },
        //暂停播放
        apause(){
            this.$refs.audio.autoplay = false
            this.$refs.audio.pause()
            this.songPlay = false
            clearInterval(this.songInfoTime)
            
        },
        //接收播放音乐url
        musicurl(_,data){
            if(this.n>0)  this.songPlay = true
            if(this.n>0) this.$refs.audio.autoplay = true
            this.n++
            // console.log(this.n);
            this.$store.state.musicObj = data;
            this.musicObj = data
            this.songit()
            //歌手信息
            this.$store.dispatch('songId',data.id)
            // 去重添加播放记录
            if (this.songIdObj.length > 0) {
                this.songIdObj.forEach((i,k) =>{
                    if(i.id === data.id){
                        this.songIdObj.splice(k,1)
                    }
                })
                this.songIdObj.unshift(data)
                localStorage.setItem('playSongList',JSON.stringify(this.songIdObj))
            } else {
                this.songIdObj.unshift(data)
                localStorage.setItem('playSongList',JSON.stringify(this.songIdObj))
            }
        },
        //重新播放
        rework(){
            this.$refs.audio.load()
            // this.songPlay = true
            this.aplay()
        },
        //播放时间
        songit() {
            this.songInfoTime =  setInterval(()=> {
                    this.songTime = this.$refs.audio.currentTime 
                    this.$store.state.currentTime = this.songTime
                    let m = parseInt(this.songTime / 60 % 60)
                        m = m < 10 ? '0' + m : m
                    let s = parseInt(this.songTime % 60)
                        s = s < 10 ? '0' + s : s
                    this.ltime = `${m}:${s}` || '00:00'
                    this.$refs.playcolor.style.width = `${this.songTime / this.musicObj.dt*1000*100}%`
                },100)
        },
        //点击播放条，调整音乐进度
        progressBar(e){
            //点击播放条，调整音乐进度

            this.$refs.playcolor.style.width = `${e.offsetX/478*100}%`
            this.$refs.audio.currentTime = (e.offsetX/478*this.musicObj.dt/1000)
            this.songit() //调用播放时间
        },
        // 音量开关
        songVolume(){
            this.vsVolume = false
            this.$refs.audio.muted = true
        },
        //静音
        mute(){
            this.vsVolume = true
            this.$refs.audio.muted = false
        },
        // 音量条
        huds(e){
            this.$refs.hudsColor.style.width = `${e.offsetX/100*100}%`
            this.$refs.audio.volume = e.offsetX/100
        },
        //返回首页
        goHome(){
            // this.$router.go()
            this.$router.push({
                path:'/home',
            })
        },       
    },
    computed:{
        //图片加载成功
        songPlayImg(){
            return this.$store.state.songImg
        }
    },
    mounted(){
        //读取本地存储,初始播放器
        this.songIdObj = JSON.parse(localStorage.getItem('playSongList')) || [{
            arid:8325,dt:250173,dts:"04:10",id: 254135,name: "给未来的自己",singer: "梁静茹",
            url: "http://m801.music.126.net/20230203142121/45f1ff3c59be2fd9fc139bac2000554c/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/23398022037/02b4/cacb/a77e/ac9e187c80ca3ae9e0c4b6e8c348609f.mp3"
        }]
        this.$store.commit('PlayMusic',[this.songIdObj[0]])
        this.pidmusicurl = pubsub.subscribe('musicurl',this.musicurl)
        //默认不静音
        this.$refs.audio.muted = false
        //初始化音量
        this.$refs.audio.volume = 0.5
    },
    beforeDestroy(){
        pubsub.unsubscribe(this.pidmusicurl)
        clearInterval(this.songInfoTime)
    }

}
</script>

<style lang="less" scoped>
    

.bottom {

display: flex;
width: 1300px;
    .leftSide {
        flex-basis: 240px;
        border-right: 1px solid rgba(221, 226, 235,.8);
        padding: 26px 10px 26px 26px;
        overflow: auto;
        flex-shrink: 0;
        height: 729px;
        .head {
            padding-bottom: 14px;
            img {
                height: 25px;
                width: 25px;
                vertical-align:middle;
            }
        }
        .side-title {
            height: 25px;
            line-height: 25px;
            margin-top: 20px;
            color: rgb(113 119 144 / 78%);
            margin-bottom: 14px;
            }
        a {
            text-decoration: none;
            color: rgb(82 91 114);
            display: flex;
            align-items: center;
            font-weight: 400;
            padding: 10px;
            font-size: 14px;
            border-radius: 6px;
            transition: .3s;
            i {
                margin-right: 10px;
                font-size: 20px;
                color: red;
            }
        }
        a:hover {
            background-color: rgba(221, 226, 235,.8);
        }

    }
    .rightList {
        display: flex;
        width: 1024px;
        flex-direction: column;

        .rightBottom {
            position: relative;
            display: flex; 
            flex: 2;
                .rightBox {
                    overflow:scroll;
                }
            .playerBox {
                position: absolute;
                height: 91px;
                width: 100%;
                bottom: 0;
                left: 0;
                border-radius: 0 0 30px 0;
                border-top: 1px solid rgba(221, 226, 235,.7);
                z-index: 1111;
                img {
                    float: left;
                    width: 91px;
                    height: 91px;
                }
                .songTop {
                    display: flex;
                    padding: 5px;
                    align-items: center;
                    a {
                            padding: 0 8px;
                            display: flex;
                            align-items: center;
                            font-weight: 400;
                            font-size: 15px;
                            transition: .3s;
                            i {
                                font-size: 32px;
                            }
                    }
                    .volumeBig {
                        width: 100px;
                        border-radius: 6px;
                        height: 6px;
                        background-color: rgba(221, 226, 235,.7);
                        display: flex;
                        a {
                            width: 100%;
                            height: 100%;
                            padding: 0;
                        }
                        .volumeMin {
                            border-radius: 6px;
                            width: 50%;
                            height: 100%;
                            background-color: red;
                        }
                    }
                }
                .songBottom {
                    display: flex;
                    padding: 5px;
                    a {
                            padding: 0 8px;
                            color: rgb(82 91 114);
                            display: flex;
                            align-items: center;
                            font-weight: 400;
                            font-size: 13px;
                            transition: .3s;
                            flex: 1;
                    }
                    .songTime {
                        display: flex;
                        flex: 5;
                        .progress {
                            display: flex;
                            flex: 1;
                            margin: 5px;
                            height: 10px;
                            background-color: rgba(221, 226, 235,.7);
                            border-radius: 10px;
                            a {
                                padding: 0;
                                .progressColor {
                                    height: 100%;
                                    width: 0%;
                                    background-color: red;
                                    border-radius: 10px;
                            }
                            }
                        }
                    }
                    .playList {
                        display: flex;
                        flex: 2;

                    }
                }
            }
        }
    }

    .load {
        position: fixed;
        background-color: rgb(255, 255, 255);
        width: 1022px;
        height: 689px;
        z-index: 10000;
        .loading {
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(-20%, -50%);
        }
    }

    }    
    #canvas {
        
        position: absolute;
        bottom: 0;
        right:0;
        z-index: 1110;
    }
</style>