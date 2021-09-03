const path = require('path')
const fs = require('fs')
const webpackBase = require('./webpack.base')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')



// 获取当前目录的绝对路径
const absolutePath = fs.realpathSync(process.cwd());

// 开发环境配置
const webpackMerge = merge(webpackBase, {
  output: {
    // 不输出路径信息
    pathinfo: false
  },
  cache: true,
  // eval 提高编译效率
  // devtool: 'cheap-module-eval-source-map'
  // 完整展示错误信息
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(absolutePath, 'public/index.html'),
      hash: 6,
      inject: 'body' // 在body标签下方填入标签
    }),
    // 开启webpack热更新功能
    new webpack.HotModuleReplacementPlugin()
  ],
  // 只在发生错误时输出
  stats: {
    preset: 'errors-only'
  },
  // 在第一个错误出现时抛出失败结果,终止打包
  bail: true,
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    moduleIds: 'named', // NamedModulesPlugin模块 迁移
    // webpack编译出错跳过报错阶段,在编译结束后报错
    //  NoEmitOnErrorsPlugin模块迁移
    emitOnErrors: true
  }
})

module.exports = webpackMerge