const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    
  devServer: {
    proxy: {
      '/api': {
            target:'http://www.fzapi22.tk',
            changeOrigin: true,
            ws:true,
            pathRewrite: { 
              '^/api' : '' // 路径重写
            } 
        }
    }
},
  transpileDependencies: true,
  lintOnSave: true, //关闭语法检查


})
// axios.defaults.withCredentials = true;
