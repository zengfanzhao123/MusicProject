import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
import store from "@/store";
//引入Luyou 组件
import SearchResult from '@/pages/SearchResult'
import SongBank from '@/pages/SongBank'
import MusicLists from '@/pages/MusicLists'
import SongMenu from '@/pages/SongMenu'
import SongVideo from '@/pages/SongVideo'
import PlayVideo from '@/pages/PlayVideo'
import SongRadio from '@/pages/SongRadio'
import PlayRadio from '@/pages/PlayRadio'
import SingerMess from '@/pages/SingerMess'
import PlaysList from '@/pages/PlaysList'
import MusicLikeList from '@/pages/MusicLikeList'
import home from '@/pages/home'
import recommend from '@/pages/recommend'
import getLyric from '@/pages/getLyric'
import transfer from '@/pages/transfer'
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
		{
			name:'home',
			path:'/home',
			component:home,
			meta:{isAuth:true}
		},
		{path:'*', redirect: '/home'},
		{
			name:'recommend',
			path:'/recommend',
			component:recommend,
		},	
		{
			name:'getLyric',
			path:'/getLyric',
			component:getLyric,
		},
		{
			name:'transfer',
			path:'/transfer',
			component:transfer,
		}	
	]
})

//暴露router
export default router
//前置路由守卫
router.beforeEach((to,from,next)=>{
	store.state.loading = true;
	if(to.meta.isAuth) { //判断是否需要鉴定权限
		if(localStorage.getItem('user')) {
			next()
		} else {
			// console.log(store.state.thisVc);
			const thistime = setInterval(()=>{
				let thisNew = store.state.thisVc
				if(thisNew){
					thisNew.$notify({
						title: '警告',
						message: '请先登录',
						type: 'warning'
					});
					clearInterval(thistime)
				}
			},500)
			store.state.loading = false;
			}
	} else{
		next()
	}
	// next()
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach(()=>{
	store.state.loading = false;
})
