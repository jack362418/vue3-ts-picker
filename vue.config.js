'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  // pages:{
  //   index:{
  //     entry: 'src/components/colorPicker/index.ts'
  //   }
  // },
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: false,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: false
  },
  css:{
    extract: true,

    // 是否开启 CSS source map？

    sourceMap: false,
  },
  configureWebpack: {
    name: "picker",
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  }
}
