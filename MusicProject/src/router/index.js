import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入Luyou 组件
import SearchResult from '../components/SearchResult.vue'
import SongBank from '../components/SongBank.vue'
import MusicLists from '../components/MusicLists.vue'
import SongMenu from '../components/SongMenu.vue'
import SongVideo from '../components/SongVideo.vue'
import PlayVideo from '../components/PlayVideo.vue'
import SongRadio from '../components/SongRadio.vue'
import PlayRadio from '../components/PlayRadio.vue'
import SingerMess from '../components/SingerMess.vue'
import PlaysList from '../components/PlaysList.vue'
import MusicLikeList from '../components/MusicLikeList.vue'

Vue.use(VueRouter)
//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{   
            name:'SearchResult',
			path:'/SearchResult',
			component:SearchResult,
		},
		{
			name:'SongBank',
			path:'/SongBank',
			component:SongBank
		},
		{
			name:'MusicLists',
			path:'/MusicLists',
			component:MusicLists
		},
		{
			name:'SongMenu',
			path:'/SongMenu',
			component:SongMenu
		},		
		{
			name:'SongVideo',
			path:'/SongVideo',
			component:SongVideo
		},		
		{
			name:'PlayVideo',
			path:'/PlayVideo',
			component:PlayVideo
		},		
		{
			name:'SongRadio',
			path:'/SongRadio',
			component:SongRadio
		},		
		{
			name:'PlayRadio',
			path:'/PlayRadio',
			component:PlayRadio
		},
		{
			name:'SingerMess',
			path:'/SingerMess',
			component:SingerMess
		},
		{
			name:'PlaysList',
			path:'/PlaysList',
			component:PlaysList
		},		
		{
			name:'MusicLikeList',
			path:'/MusicLikeList',
			component:MusicLikeList,
			meta:{isAuth:true}
		},
	]
})

//暴露router
export default router
//前置路由守卫
router.beforeEach((to,from,next)=>{
	// console.log(to,from)
	if(to.meta.isAuth) { //判断是否需要鉴定权限
		if(localStorage.getItem('logincookie')) {
			next()
		}else{
			alert('请先登录')
		}

	} else{
		next()
	}
	// next()
})
