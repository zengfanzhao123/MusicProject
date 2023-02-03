import axios  from "axios"
import serviceConfig from "./config";
import store from "@/store";
const service = axios.create({
  timeout: 10000,//等待时间
  baseURL: serviceConfig.baseURL //设置公共地址
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //加载动画
  // console.log(config.url);
  if(config.url === '/mv/first' || config.url === '/toplist' || config.url === '/dj/hot' || config.url === '/top/playlist/highquality'){
    store.state.loading = true;
  }
  return config
}, error=> {
  // 对请求错误做些什么
  return Promise.reject(error)
}),

// 添加响应拦截器
service.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
    //关闭加载动画
    store.state.loading = false;
  return response
},error=>{
  let message = "";
  store.state.loading = false;
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = "接口重定向了！";
        break;
      case 400:
        message = "参数不正确！";
        break;
      case 401:
        message = "您未登录，或者登录已经超时，请先登录！";
        break;
      case 403:
        message = "您没有权限操作！";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        message = "请求超时！";
        break;
      case 409:
        message = "系统已存在相同数据！";
        break;
      case 500:
        message = "服务器内部错误！";
        break;
      case 501:
        message = "服务未实现！";
        break;
      case 502:
        message = "网关错误！";
        break;
      case 503:
        message = "服务不可用！";
        break;
      case 504:
        message = "服务暂时无法访问，请稍后再试！";
        break;
      case 505:
        message = "HTTP 版本不受支持！";
        break;
      default:
        message = "异常问题，请联系管理员！";
        break;
    }
  }
  return Promise.reject(message);
})
export default service