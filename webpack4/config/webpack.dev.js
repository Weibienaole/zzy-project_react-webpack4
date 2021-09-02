const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.base')


// 开发环境配置
module.exports = merge(webpackBase, {
  output: {
    // 不输出路径信息
    pathinfo: false
  },
  // 关闭部分构建优化
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  // eval 提高编译效率
  devtool: 'cheap-module-eval-source-map'
})