//引入Vue核心库
import Vue from 'vue'
import { music } from '@/http/api'
//引入Vuex
import Vuex from 'vuex'
import pubsub from 'pubsub-js'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {
	// 歌手id用于调取图片
	songId(context,id){
		context.commit('SongId',id)
	},
}
//准备mutations对象——修改state中的数据
const mutations = {
	SongId(state,id){
		//获取歌曲封面
		music.getSongDetail(id).then(res => {state.songImg=res.data.songs[0].al.picUrl})
	},
	//音乐详情
	PlayMusic(state,value){
		const [muiscObj] = value
		music.getMusicUrlId(muiscObj.id).then(res => {
			muiscObj.url = res.data.data[0].url
			pubsub.publish('musicurl',muiscObj)
			// console.log(muiscObj);
		})
	},
	SingerIdData(state,value){
			state.SingerId = value
	},
}
//准备state对象——保存具体的数据
const state = {
	songImg:'',
	SingerId:'',
	useId:'',
	loading:false,
	
}
const getters = {
}
//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})


