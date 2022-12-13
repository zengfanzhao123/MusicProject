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
        <!-- 登录 -->
        <div class="register"   @click="login"  v-if="!loginstate"><a href="javascript:;">登录</a></div>
        <div class="login" v-show="loginNone">
            <img id="qrimg" ref="qrimg" src="" alt="">
            <a href="javascript:;" @click="qrlogin">已在手机上确认</a>
        </div>
        <!-- 登录成功 -->
        <div class="register2" v-if="loginstate">
            <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='不用了'
            icon="el-icon-info"
            icon-color="red"
            title="是否退出登录？"
            @confirm="confirmlogin"
            >
            <a href="javascript:;" slot="reference"><img :src="loginObj.avatarUrl">
            <span>{{loginObj.nickname}}</span></a>
            </el-popconfirm>
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

export default {

    name:'TopHead',
    data() {
        return {
            searchValue:'',
            searchFocusJud:false,
            loginNone:false,
            SearchHistoryObj:JSON.parse(localStorage.getItem('SearchHistory')) || [],
            nowtime:{new:'',old:''},
            logincode:"",
            key:'',
            loginstate:JSON.parse(localStorage.getItem('loginstate')),
            loginObj:{nickname:"",avatarUrl:"",userId:''},
            qrimg:'qrimg',
        }
    },
    methods:{
        // 退出登录删除cookie
        confirmlogin(){
            // console.log(1);
            this.loginstate = false
            this.$cookieStore.delCookie('cookiename');
            localStorage.removeItem('logincookie')
            localStorage.setItem('loginstate', JSON.stringify(this.loginstate))
            //跳转到主页
            this.$router.push({
                path:'/#/',
            })

        },
        //登录
        login(){
            this.nowtime.old = this.nowtime.new || 0
            this.nowtime.new = new Date().getTime()
            let time = this.nowtime.new-this.nowtime.old
            if(time> 2000) {
                // console.log(time);
                 axios.get("http://www.fzapi22.tk/login/qr/key"+'?t=' + new Date().getTime(),{
                    }).then( res =>{
                        this.key = res.data.data.unikey
                        axios.get("http://www.fzapi22.tk/login/qr/create"+'?t=' + new Date().getTime(),{
                            params:{
                                key:res.data.data.unikey,
                                qrimg:this.qrimg
                            }
                        }).then( res2 =>{
                            // console.log(res.data.data.qrimg)
                            this.$refs.qrimg.src = res2.data.data.qrimg
                                
                        })
                    })
            }
                   
           this.loginNone = true
        },
        // 确认登录
        qrlogin() {
            this.loginNone=false
            axios.get("http://www.fzapi22.tk/login/qr/check"+'?t=' + new Date().getTime(),{
                                    params:{
                                        key:this.key,
                                    }
                                }).then( res3 =>{
                                    this.logincode = res3.data.code
                                    // console.log(res3.data,res3.data.code);
                                     //验证收到的登录信息
                                            this.logintimer = setInterval(()=>{
                                                if(this.logincode === 803)  {
                                                    // console.log(res3.data,803)
                                                    alert('登录成功！')
                                                    this.loginstate = true
                                                    this.loginNone = false
                                                    this.$cookieStore.setCookie( 'cookiename' , res3.data.cookie)
                                                    localStorage.setItem('loginstate', JSON.stringify(this.loginstate))
                                                    axios.post("login/status"+'?t=' + new Date().getTime(),{
                                                                cookie:res3.data.cookie,
                                                            }).then(res => {
                                                                console.log(res.data,res3.data.cookie);
                                                                localStorage.setItem('logincookie', JSON.stringify(res.data.data.profile))
                                                                this.loginObj.avatarUrl = res.data.data.profile.avatarUrl
                                                                this.loginObj.nickname = res.data.data.profile.nickname
                                                                this.loginObj.userId = res.data.data.profile.userId
                                                                this.$store.state.userId = res.data.data.profile.userId
                                                            })
                                                     clearInterval(this.logintimer)
                                                }
                                                
                                                if(this.logincode === 800)  {
                                                    clearInterval(this.logintimer)
                                                    alert('登录失效')
                                                    this.confirmlogin()
                                                    
                                                }
                                        },3000)
                                })
        },
        // 搜索页面路由
        search(){
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
    //登录记录
    const data = JSON.parse(localStorage.getItem('logincookie')) || {nickname:"",avatarUrl:"",userId:''}
        this.loginObj.avatarUrl = data.avatarUrl
        this.loginObj.nickname = data.nickname
        this.loginObj.userId = data.userId
        this.$store.state.userId = data.userId
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
        .register2 {
            display: flex;
            flex: 1;
            
            a {
                margin-left: 87px;
                
            }
            img {
                width: 25px;
                border-radius: 50%;
                vertical-align:middle;
            }
            span {
                margin-left: 5px;
                font-size: 14px;
                display: inline-block;
                vertical-align:middle;
            }
        }
        .login {
            position: absolute;
            top: 58px;
            right: 118px;
            z-index: 1009;
            border-radius: 10px;
            width: 180px;
            height: 220px;
             background-color: #fff;
             a {
                display: block;
                width: 180px;
                color: #fff;
                font-weight: 700;
                background-color: red;
                border-radius: 5px;
                text-align: center;
             }
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