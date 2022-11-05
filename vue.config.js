const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:"/smart_home/",
  transpileDependencies: true,
  devServer:{
    proxy: {
      '/lib': {
        target: 'http://localhost:80',
        ws: true,
        changeOrigin: true
      }
    }
  }
})

