
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const packageJson = require('../package.json')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 在html中引入文件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const DllPluginMethods = require('./DllPluginMethods')



const mode = process.env.NODE_ENV
const PUBLIC_URL = packageJson.homepage
const isProduction = mode === 'production'

// 获取当前目录的绝对路径
const absolutePath = fs.realpathSync(process.cwd());


const includeOptions = {
  include: path.resolve(absolutePath, 'src'),
}
const BasicsCssLoaders = [
  // 模块热更新css需要 样式以style形式存在
  isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve(absolutePath, 'config/postcss.config.js')
      },
      sourceMap: false
    }
  }
]

// 基础配置
const webpackConfig = {
  mode,
  entry: {
    index: path.resolve(absolutePath, 'src/index.js')
  },
  output: {
    filename: './files/js/[name].[hash:6].js',
    chunkFilename: './files/js/[name].[hash:6].js',
    path: path.resolve(absolutePath, 'dist'),
    // 打包时关闭箭头函数
    environment: {
      arrowFunction: false
    },
    // 清除上一次的打包文件
    clean: {
      keep: /static/, // 保留 'static' 下的静态资源
    },
    // publicPath: '/',
  },
  // webpack5 设置了才有热更新效果 保证ie11兼容
  // 热更新会失效
  // target: ['web', 'es5'],
  target: 'web',
  resolve: {
    modules: [
      path.resolve(absolutePath, 'node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve('src'),
      '_Components': '/src/components'
    },
    // 第三方包中直接采用 ES5 形式的内容
    mainFields: ['main'],
  },
  module: {
    rules: [
      {
        // 一个文件只经过一个判断
        oneOf: [
          {
            test: /\.css$/,
            include: [
              path.resolve(absolutePath, 'src'),
              path.resolve(absolutePath, 'node_modules/antd-mobile'),
              path.resolve(absolutePath, 'node_modules/zzy-javascript-devtools'),
              path.resolve(absolutePath, 'node_modules/normalize.css/normalize.css')
            ],
            use: BasicsCssLoaders,
          },
          {
            test: /\.less$/,
            ...includeOptions,
            use: [
              ...BasicsCssLoaders,
              'less-loader'
            ],
          },
          {
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  workers: 3,
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                }
              }
            ],
            ...includeOptions,
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            exclude: /node_modules/,
            parser: {
              dataUrlCondition: {
                maxSize: 1024 * 20,
              }
            },
            generator: {
              publicPath: './',
              filename: 'files/fonts/[name]_[hash:6].[ext]',
            },
          },
          { // 图片的转化
            test: /\.(jpe?g|png|gif|bmp|svg)$/i,
            type: 'asset',
            include: [
              path.resolve(absolutePath, 'src'),
              path.resolve(absolutePath, 'node_modules/zzy-javascript-devtools/lib'),
            ],
            parser: {
              dataUrlCondition: {
                maxSize: 1024 * 15,
              }
            },
            generator: {
              publicPath: './',
              filename: 'files/media/[name]_[hash:6].[ext]',
            },
          },
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './files/css/main_[hash:6].css'
    }),
    // 设置全局变量
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      useState: ['react', 'useState'],
      useEffect: ['react', 'useEffect'],
      // default  添加默认请求
      '_request': [path.resolve(absolutePath, 'src/utils/request.js'), 'request']
    }),
    new InterpolateHtmlPlugin(HtmlWebPackPlugin, {
      PUBLIC_URL,
    }),
    new AddAssetHtmlWebpackPlugin([
      ...DllPluginMethods('path')
    ]),
    ...DllPluginMethods('plugins'),
    new CopyWebpackPlugin([
      {
        from: path.resolve(absolutePath, 'public/browserIcon.svg'),
        to: './'
      },
      {
        from: path.resolve(absolutePath, 'static'),
        to: './static'
      },
    ]),
    // 解决全局变量无法显示的异常
    new webpack.DefinePlugin({
      'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN)
    }),
  ],
}




module.exports = webpackConfig
