import service from '../index.js'
export const search = { 
    // 歌曲搜索
   songSearch(keywords){
       return service({
           url: "/cloudsearch",
           method: "get",
           params:{
            keywords,
           }
       })
   },
}
export const login = {
    //获取key
    getLoginKey(){
        return service({
            url: "/login/qr/key",
            method: "get",
            params:{
                timestamp:new Date().getTime(),
            }
        })
    },
    //生成二维码
    getLoginCreate(key){
        return service({
            url:'/login/qr/create',
            method: 'get',
            params:{
                timestamp:new Date().getTime(),
                key,
                qrimg,
            }
        })
    },
    //登录状态
    getLoginCheck(key){
        return service({
            url:'/login/qr/check',
            method: 'get',
            params:{
                timestamp:new Date().getTime(),
                key,
            }
        })
    },
    //用户信息
    getLoginUser(cookie){
        return service({
            url:'/login/status',
            method: 'get',
            params:{
                timestamp:new Date().getTime(),
                cookie,
            }
        })
    }
}
export const singer = {
    //热门歌手
    getHotSinger(){
        return service({
            url: '/top/artists',
            method: 'get',
        })
    },
    // 歌手详情
    getSingerDetail(id){
        return service({
            url: '/artist/detail',
            method: 'get',
            params:{id}
        })
    },
    // 歌手热门歌曲
    getSingerHotSong(id){
        return service({
            url: '/artist/top/song',
            method: 'get',
            params:{id}
        })
    }
}
export const music = {
  
    //喜欢的音乐
    getLikeMusic(uid,cookie){
        return service({
            url: '/likelist',
            method: 'get',
            params:{
                uid,
                cookie
            }
        })
    },
    //歌曲详情
    getSongDetail(ids){
        return service({
            url: '/song/detail',
            method: 'get',
            params:{
                ids,
            }
        })
    },
    //音乐url
    getMusicUrlId(id){
        return service({
            url: '/song/url',
            method: 'get',
            params:{
                id,
            }
        })
    },
}
export const playList = {
    //歌单详情
    getPlayListDetail(id){
        return service({
            url: '/playlist/detail',
            method: 'get',
            params:{
                id,
            }
        })
    },
    //热门榜单
    getTopList(){
        return service({
            url: '/toplist',
            method: 'get',
        })
    },
    // 热门歌单
    getHotPlaylist(){
        return service({
            url: '/top/playlist/highquality',
            method: 'get',
        })
    },
}
export const radioSet = {
    // 电台详情
    getRadioSetDetail(rid){
        return service({
            url: '/dj/detail',
            method: 'get',
            params:{
                rid,
            }
        })
    },
    // 热门电台
    getHotRadio(){
        return service({
            url: '/dj/hot',
            method: 'get',
        })
    },
    //电台节目
    getRadioProgram(rid){
        return service({
            url: '/dj/program',
            method: 'get',
            params:{rid}
        })
    },
    // 电台节目详情
    getRadioProgramDetail(id){
        return service({
            url: '/dj/program/detail',
            method: 'get',
            params:{id}
        })
    },
}
export const mv =  {
    //mvurl
    getMvUrl(id){
        return service({
            url: '/mv/url',
            method: 'get',
            params:{id}
        })
    },
    // 热门MV
    getHotMv(){
        return service({
            url: '/mv/first',
            method: 'get',
            params:{limit:50}
        })
    },
}
export const banner = {
    //轮播
    getBanner(){
        return service({
            url: '/banner',
            method:'get',
            params:{
                type:2,
            }
        })
    }
}
export const rec = {
      //每日推荐
    getRecSong(cookie){
        return service({
            url: "/recommend/songs",
            method: 'get',
            params:{
                cookie,
            }
        })
    },
    getRecDatil(cookie){
        return service({
            url: '/recommend/resource',
            method: 'get',
            params:{cookie}
        })
    }
}
//import {music} from '@/http/api'