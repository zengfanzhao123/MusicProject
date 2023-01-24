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
        <div class="register"   @click="login"  v-if="!loginstate"><a href="javascript:;">网易云登录</a></div>
        <div class="login" v-show="loginNone">
        <!-- loginNone -->
        <el-tabs value='first'>
            <el-tab-pane  label="扫码登录"  name="first">
            <h4 v-if="!qrimg">二维码失效请重新获取</h4>
            <img id="qrimg" ref="qrimg" :src="qrimg" alt="">
            <a href="javascript:;" @click="login" v-if="!qrimg"><span style="margin-left: 50px;">重新获取</span></a>
            </el-tab-pane>
            <el-tab-pane style="font:right" label="短信登录" name="second">
                <input type="text"  ref="phone" style="margin-top: 20px;" placeholder="请输入电话号码">
                <div class="flex">
                <input type="text" class="yz" ref="yz" placeholder="请输入验证码">
                <a href="javascript:;" @click="getauth" ref="qrcode" >
                <span class="ac">获取验证码</span></a>
                </div>
                <a class="dl" href="javascript:;" ref="dl" @click="dxlogin"><span>登录</span></a>
            </el-tab-pane>
        </el-tabs>
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
            <a href="javascript:;" slot="reference"><img :src="user.avatarUrl">
            <span>{{user.nickname}}</span></a>
            </el-popconfirm>
        </div>
        </div>
        <div class="seachrec" v-show="searchFocusJud">
            <span style="margin-left:10px">历史记录</span> <a href="javascript:;" @click="ClearLog " style="float:right;padding:5px">清除</a>
            <ul>
                <li v-for="(h,i) in SearchHistoryObj" :key="i"><a href="javascript:;" @click="searchValueHis(h)">{{h}}</a></li>
            </ul>
        </div>
        <keep-alive include="News"> 
            <router-view ref="searchVal"></router-view>
        </keep-alive>
</div>
</template>

<script>
import {login} from '@/http/api'
export default {

    name:'TopHead',
    data() {
        return {
            searchValue:'',
            searchFocusJud:false,
            loginNone:false,
            SearchHistoryObj:JSON.parse(localStorage.getItem('SearchHistory')) || [],
            nowtime:{new:'',old:''},
            key:'',
            loginstate:JSON.parse(localStorage.getItem('loginstate')),
            qrimg:'',
            user:{nickname:null,avatarUrl:null,id:null},
            loginCode:true,
        }
    },
    methods:{
        //短信登录
        async dxlogin(){
            if(this.$refs.phone.value && this.$refs.yz.value){
                const res = await login.getCellphone(this.$refs.phone.value,this.$refs.yz.value)
                this.$cookieStore.setCookie( 'cookiename' , res.data.cookie)
                this.loginstate = true
                this.loginNone = false
                this.userMess(res.data.cookie)
            } else {
                alert('请先输入电话号码和验证码')
            }
        },
        //获取验证码
        async getauth(){
            if(this.$refs.phone.value) {
                this.$refs.qrcode.style = "pointer-events:none"
                const res = await login.getCaptcha(this.$refs.phone.value)
                console.log(res.data);
                if(res.data.code === 400) alert('手机号不符合规范')
                let num = 60
                const getqrtime = setInterval(()=>{
                    num--
                    if(num < 10) num = '0' + num
                    this.$refs.qrcode.children[0].innerHTML = `${num}后重新发送`
                    if (num === '00') {
                        clearInterval(getqrtime)
                        this.$refs.qrcode.children[0].innerHTML = `重新发送`
                        this.$refs.qrcode.style = "pointer-events:auto"
                    }
                },1000)
            } else {
                alert('请先输入电话号码')
            }
        },
        // 退出登录删除cookie
        confirmlogin(){
            this.loginstate = false
            this.$cookieStore.delCookie('cookiename');
            localStorage.removeItem('user')
            localStorage.setItem('loginstate', JSON.stringify(this.loginstate))
            //跳转到主页
            this.$router.push({
                path:'/home',
            })

        },
        //登录生成二维码
        async login(){
            this.nowtime.old = this.nowtime.new || 0
            this.nowtime.new = new Date().getTime()
            let time = this.nowtime.new-this.nowtime.old
            if(time> 2000) {
                const res = await login.getLoginKey()
                this.key = res.data.data.unikey
                const res2 = await login.getLoginCreate(res.data.data.unikey)
                this.qrimg = res2.data.data.qrimg
            }
           this.loginNone = true
           this.qrlogin()
        },
        // 登录状态
        qrlogin() {
            const loginTimer = setInterval(async() =>{
                const res = await login.getLoginCheck(this.key)
                if(res.data.code === 803) {
                this.loginstate = true
                this.loginNone = false
                this.$cookieStore.setCookie( 'cookiename' , res.data.cookie)
                localStorage.setItem('loginstate', JSON.stringify(this.loginstate))
                clearInterval(loginTimer)
                this.userMess(res.data.cookie)
                }
                if(res.data.code === 800)  {
                    clearInterval(loginTimer)
                    this.loginstate = false
                    this.loginNone = false
                    this.qrimg = null
                }
            },3000)
        },
        //用户信息
        async userMess(cookie) {
            
            const res = await login.getLoginUser(cookie)
            this.user.id = res.data.data.account.id
            this.user.nickname = res.data.data.profile.nickname
            this.user.avatarUrl = res.data.data.profile.avatarUrl
            localStorage.setItem('user',JSON.stringify(this.user))
            //登陆后刷新
                setTimeout(() => {location.reload()},1500)
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
    // 登录记录
    if (JSON.parse(localStorage.getItem('user'))){
        const data = JSON.parse(localStorage.getItem('user'))
        this.user.avatarUrl = data.avatarUrl
        this.user.nickname = data.nickname
        this.user.id = data.id
        this.$store.state.userId = data.id
    }

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
            box-shadow: 1px 1px 1px 1px rgba(221, 226, 235);
            position: absolute;
            top: 450%;
            right: 25%;
            z-index: 99999;
            border-radius: 10px;
            width: 400px;
            height: 300px;
             background-color: #fff;
             border: 1px solid #ccc;
             box-sizing: border-box;
             padding: 20px 100px;
             input {
                border: 1px solid #ccc;
                border-radius: 2px;
                height: 25px;
             }
             .yz {
                width: 85px;
                margin-bottom: 25px;
            }

            span {
                font-size: 10px;
                margin-left:5px;
                background-color:skyblue;
                display: inline-block;
                height: 28px;
                width: 80px;
                text-align: center;
                vertical-align:middle;
                line-height: 28px;
                border-radius: 5px;
            }
            .flex {
                display: flex;
                width: 175px;
                height: 27px;
                justify-content: space-between;
                margin-top: 25px;
                margin-bottom: 30px;
            }
            
            .dl {
                margin-left: 25px;
                display: inline-block;
                width: 100px;
                span {
                    display: inline-block;
                    width: 100px;
                    text-align: center;
                    color: #fff;
                    background-color: red;
                }
                
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
   #qrimg {
    z-index: 99999;
   }
</style>