import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import "./assets/font_uztr9u3r3bl/iconfont.css";
import store from './store'
import router from './router'
import  {setCookie, getCookie, delCookie} from './util/util';


Vue.prototype.$cookieStore = {
  setCookie,
  getCookie,
  delCookie
}
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
