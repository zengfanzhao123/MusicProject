const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    
  devServer: {
    // websocket通信失败解决
    host: '0.0.0.0',
  // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      //解决跨域
      '/login': {
        target:'http://www.fzapi22.tk',
        changeOrigin: true,
      }
    }
},
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查


})
// axios.defaults.withCredentials = true;
