const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    // websocket通信失败解决
  devServer: {
    host: '0.0.0.0',
  // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://0.0.0.0:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
},
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查


})
