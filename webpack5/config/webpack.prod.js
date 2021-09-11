const path = require('path')
const fs = require('fs')
const webpackBase = require('./webpack.base')
const { merge } = require('webpack-merge')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

// 打包完成之后打开一个页面，显示每个包大小
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 获取当前目录的绝对路径
const absolutePath = fs.realpathSync(process.cwd());

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
      new CssMinimizerWebpackPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              // 清除注释
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserWebpackPlugin({
        exclude: /node_modules/,
        terserOptions: {
          // 是否将注释剥离到单独的文件中
          extractComments: false,
          // 开启并行压缩
          parallel: true,
          // 开启缓存
          cache: true,
        },
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 第三方依赖
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          minSize: 1024, // 小于1kb的文件不进行拆分
          maxSize: 100 * 1024, // 大于100kb的文件尝试拆分为小文件
          // 拆分前必须共享模块的最小 chunks 数
          minChunks: 2,
          priority: 10, // 权重
        },
        // 缓存组
        commons: {
          test: /[\\/]src[\\/]/,
          name: 'commons',
          chunks: 'all',
          minSize: 1024 * 20,
          minChunks: 2,
          // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          minSize: 1024 * 20,
          reuseExistingChunk: true,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item);
            return `${cacheGroupKey}_${moduleFileName}`;
          },
        }
      },
    },
    // 避免文件的频繁变更导致浏览器缓存失效，所以其是更好的利用缓存。提升用户体验。
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(absolutePath, 'public/index.html'),
      hash: 6,
      inject: 'body', // 在body标签下方填入标签
      // 压缩
      minify: {
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true    //删除空白符与换行符
      },
      chunksSortMode: 'auto'
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8888, // 端口号
      openAnalyzer: false
    })
  ],
  stats: {
    // 当统计信息配置没被定义，则该值是一个回退值。它的优先级比本地的 webpack 默认值高。
    all: false,
    // 是否展示错误
    errors: true,
    // 展示依赖和告警/错误的来源
    moduleTrace: true,
    // 添加 错误 信息
    logging: 'error',
  },
})