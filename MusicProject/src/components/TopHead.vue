<template>
<div class="box">

<!-- 头部导航栏 -->
    <div class='top'>  
        <div style="margin-right: 200px">
            <i style="color:#f96057" class="el-icon-loading"></i>
            <i style="color:#f8ce52" class="el-icon-loading"></i>
            <i style="color:#5fcf65;;" class="el-icon-loading"></i>
        </div>
        <div style="margin-right: 70px;">
            <!-- 返回上一页 -->
            <a href="javascript:;" @click="arrowback"><i style="margin-right: 10px;font-weight:700" class="el-icon-arrow-left"></i></a>
            <!-- 返回下一页 -->
            <a href="javascript:;"  @click="arrowfoward"><i style="margin-letf: 10px;font-weight:700" class="el-icon-arrow-right"></i></a>
        </div>
        <!-- 搜索 -->
        <div class="search"><i class="el-icon-search"></i>
        <input type="text"  placeholder="Search" class="inputSearch"
        @keydown.enter="search" @keyup.enter="search2" v-model="searchValue" 
        @focus="searchFocusJud = true"  @input="searchFocusJud=true"
        @blur='searchBlur' ref="inputSea"
        >
        </div>
        <div class="register" @mouseout="loginNone=false"  @mouseover="login"><a href="javascript:;">登录</a></div>
        <div class="login" v-show="loginNone">
            <img id="qrimg" ref="qrimg" src="" alt="">
        </div>
        </div>
        <div class="seachrec" v-show="searchFocusJud">
            <span style="margin-left:10px">历史记录</span> <a href="javascript:;" @click="ClearLog " style="float:right;padding:5px">清除</a>
            <ul>
                <li v-for="(h,i) in SearchHistoryObj" :key="i"><a href="javascript:;" @click="searchValueHis(h)">{{h}}</a></li>
            </ul>
        </div>
        <router-view ref="searchVal"></router-view>
</div>
</template>

<script>
import axios from 'axios'
import SearchResult from './SearchResult'
export default {
  components: { SearchResult },
    name:'TopHead',
    data() {
        return {
            searchValue:'',
            searchFocusJud:false,
            loginNone:false,
            SearchHistoryObj:JSON.parse(localStorage.getItem('SearchHistory')) || [],
            nowtime:{new:'',old:''},
        }
    },
    methods:{
        login(){
        //     this.nowtime.old = this.nowtime.new || 0
        //     this.nowtime.new = new Date().getTime()
        //     let time = this.nowtime.new-this.nowtime.old
        //     if(time> 2000) {
        //         // console.log(time);
        //          axios.get("http://localhost:3000/login/qr/key"+'?t=' + new Date().getTime(),{
        //             }).then( res =>{
        //                 // console.log(res.data.data.unikey)
        //                 axios.get("http://localhost:3000/login/qr/create"+'?t=' + new Date().getTime(),{
        //                     params:{
        //                         key:res.data.data.unikey,
        //                         qrimg
        //                     }
        //                 }).then( res2 =>{
        //                     // console.log(res.data.data.qrimg)
        //                     this.$refs.qrimg.src = res2.data.data.qrimg
        //                     this.timer =  setInterval(()=>{
        //                         axios.get("http://localhost:3000/login/qr/check"+'?t=' + new Date().getTime(),{
        //                             params:{
        //                                 key:res.data.data.unikey,
        //                             }
        //                         }).then( res3 =>{
        //                             if(res3.data.code === 802)  {
        //                                 console.log(res3.data)
        //                                 clearInterval(this.timer)
        //                             }
        //                             if(res3.data.code === 803)  {
        //                                 console.log(res3.data)
        //                                 alert('登录成功！')
        //                                 clearInterval(this.timer)
        //                             }
                                    
        //                             if(res3.data.code === 800)  {
        //                                 clearInterval(this.timer)
        //                                 alert('登录失效')
        //                             }
                                    
        //                         })
        //                     },3000)
                             
        //                 })
        //             })
        //     }
        //    this.loginNone = true
        },
        // 搜索页面路由
        search(e){
            this.searchFocusJud = false
            this.$router.push({
                name:'SearchResult',
                query:{
                    value:this.searchValue,
                }
            })
            // console.log(this.$refs.searchVal)
        },
        //调用搜索路由的搜索方法
        search2(){
             this.$refs.searchVal.searchList()
             this.SearchHistoryObj.unshift(this.searchValue)
             if(this.SearchHistoryObj.length >=7) this.SearchHistoryObj.splice(1,1)
             //历史记录去重
             var set = new Set(this.SearchHistoryObj)
             this.SearchHistoryObj = [...set]
             localStorage.setItem('SearchHistory', JSON.stringify(this.SearchHistoryObj))
        },
        // 后退
        arrowfoward(){
            this.$router.forward()
        },
        // 前进
        arrowback(){
            this.$router.back()
        },
        //搜索记录
        searchValueHis(h){
            this.searchValue = h
            this.$refs.inputSea.focus()
        },
        //失去焦点时，.5s后关闭记录
        searchBlur(){
            setTimeout(()=>{
                this.searchFocusJud=false
            },500)
        },
        //清除搜索记录
        ClearLog(){
            localStorage.setItem('SearchHistory', JSON.stringify([]))
            this.SearchHistoryObj = []
        }
    },
    mounted(){
        
    }
}
</script>


<style lang="less" scoped>
.box {
    display: flex;
    position: relative;
    width: 100%;
    .top {
        display: flex;
        .el-icon-loading {
            font-size: 20px;
        }
        display: flex;
        align-items: center;
        height: 58px;
        width: 100%;
        border-bottom: 1px solid rgba(221, 226, 235,.7);
        padding: 0 30px;
        .search {
            position: relative;
            display: flex;
            border-radius: 30px;
            flex: 2;
            height: 35px;
            .inputSearch {
                display: flex;
                padding-left: 60px;
                height: 35x;
                border: none;
                width: 100%;
                background-color: rgba(221, 226, 235,.8);
                border-radius: 30px;
            }
            .el-icon-search {
                font-size: 20px;
                line-height: 35px;
                text-align: center;
                position: absolute;
                left: 3%;
            }
            input::-webkit-input-placeholder{
              font-size: 15px;
              
            }
            input:focus {
                outline:none;
            }
        }
        .register {
            display: flex;
            flex: 1;
            a {
                margin-left: 87px;
            }
        }
        .login {
            position: absolute;
            top: 58px;
            right: 118px;
            z-index: 1009;
            border-radius: 10px;
            width: 180px;
            height: 180px;
        }
    }
    .seachrec {
        width: 546px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-top: 0 solid #000;
        position: absolute;
        top: 48px;
        left: 418px;
        z-index: 1000;
        border-radius:0 0 10px 10px;
        overflow: scroll;
        ul {
            padding: 0;
            margin: 0;
            margin-top: 10px;
            li {
                padding: 5px;
                width: 538px;
                a {
                    display: block;
                    width: 100%;
                    margin-left: 15px;
                }
            }
        }
        li:hover {
            background-color: rgba(221, 226, 235,.7);
            

        }
    }
}
   
</style>