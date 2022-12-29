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
  store.state.loading = true;
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
}, error=> {
    alert('网络超时，请刷新重试')
    store.state.loading = false;
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.log(error.message);
  return Promise.reject(error)
})
export default service