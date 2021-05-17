const { merge } = require('webpack-merge')
const webpackBase = require('./webpack.base')


// 开发环境配置
module.exports = merge(webpackBase, {
  // eval 提高编译效率
  devtool: 'cheap-module-eval-source-map'
})