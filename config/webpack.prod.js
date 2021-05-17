const path = require('path')
const webpack = require('webpack')
const webpackBase = require('./webpack.base')
const { merge } = require('webpack-merge')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 一个用于PostCSS的容错CSS解析器，它将发现并修复语法错误，能够解析任何输入
const PostcssSafeParser = require('postcss-safe-parser');

// 打包完成之后打开一个页面，显示每个包大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;




// 生成环境配置
module.exports = merge(webpackBase, {
  // 生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。
  // 最快
  devtool: 'cheap-module-source-map',
  /**
   * webpack中实现代码分割的两种方式：
   * 1.同步代码：只需要在webpack配置文件总做optimization的配置即可
   * 2.异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
   */
  optimization: {
    minimize: true, // 开启压缩
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {
          parser: PostcssSafeParser
        }
      }),
      new TerserWebpackPlugin({
        exclude: /node_modules/,
        terserOptions: {
          extractComments: false,
          condition: true,
          banner: "Create by zzy.",
          parallel: true,
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        //第三方依赖
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /node_modules/,
          minSize: 0, // 小于1kb的文件不进行拆分
          maxSize: 300 * 1024, // 大于300kb的文件尝试拆分为小文件
          // maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
          minChunks: 1,
          priority: 1, // 权重 首先抽离
        },
        // 缓存组
        commons: {
          name: "commons",
          chunks: "initial", // async异步代码分割 initial同步代码分割 all同步异步分割都开启
          minChunks: 3,
          minSize: 1024,
        },
      }
    },
    // 避免文件的频繁变更导致浏览器缓存失效，所以其是更好的利用缓存。提升用户体验。
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      hash: 8,
      // 压缩
      minify: {
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true    //删除空白符与换行符
      }
    }),
    new BundleAnalyzerPlugin()
  ]
})