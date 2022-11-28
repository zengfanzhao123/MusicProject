<template>
<div class="content">
<!-- 乐库排行榜 -->
    <div class="section1">
            <ul>
                <li v-for="(mf,i) in MfObjs" :key="i">
                    <div class="one">
                        <a href="javascript:;" @click="songBankIdBtn(mf.id)"><img :src="mf.coverImgUrl" class="three">
                            <div class="two"><img src="../assets/cover_play.56974e6f.png" alt=""></div>
                            <div class="ing"></div>
                        </a>
                    </div>
                    <span  style="margin-left:20px;fontSize:16px;color:#000">{{mf.name}}</span>
                    <p style="margin-left:20px">{{mf.updateFrequency}}</p>
                </li>
            </ul>
    </div>
        
</div>
        

</template>

<script>
import axios from "axios"
export default {
    name:'SongBank',
    data() {
        return {
            MfObjs:''
        }
    },
    methods:{
        // 点击排行榜歌单，跳转详情
        songBankIdBtn(id){
            this.$router.push({
                name:'MusicLists',
                query:{
                    id
                }
            })
        }
    },
    mounted(){
        axios.get("http://localhost:3000/toplist", {
		}).then(res => {
			// console.log(res.data.list)
			this.MfObjs = [...res.data.list]
            // console.log(this.MfObjs);
		})
    }
}

</script>

<style lang="css" scoped>

.content{
    width: 1023px;
    height: 690px;
    position: absolute;
    background-color: #fff;
    z-index: 998;
    top: 100%;
    right: 0;
overflow: scroll;
    
}
.section1 {
        
        width: 100%;
}
      .content .section1 a img {
        width: 224px;
        margin-bottom: 10px;
        transition: all 0.5s;
        border-radius: 20px;
    }
    
    .content .section1 li {
        position: relative;
        float: left;
        width: 224px;
        height: 283px;
        padding: 8px;
        font-size: 14px;
        color: #999;
        border-radius: 20px;

    }
    
    .content .section1 li:nth-child(5) {
        margin-right: 0;
    }
    
    .content .section1 li a {
        font-size: 14px;
        border-radius: 20px;
    }
    
    .content .section1 li:hover a {
        color: #31c27c;
        border-radius: 20px;
    }
    
    .content .section1 .two {
        position: absolute;
        top: 96px;
        right: 96px;
        width: 49px;
        opacity: 0;
        z-index: 2;
        transition: all 0.5s;
    }
    
    .content .section1 .two img {
        width: 49px;
    }
    
    .content .section1 .one:hover .two {
        opacity: 1;
    }
    
    .content .section1 .one:hover .three {
        transform: scale(1.2);
    }
    
    .content .section1 ul li a .ing {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 224px;
        height: 224px;
        background-color: rgba(0, 0, 0, .3);
        opacity: 0;
        transition: all 0.5s;
        border-radius: 20px;
    }
    
    .content .section1 .one {
        width: 224px;
        height: 224px;
        overflow: hidden;
        border-radius: 20px;
    }
    
    .content .section1 .one:hover .ing {
        opacity: 1;
        border-radius: 20px;
    }
</style>