
const path = require('path')
const fs = require('fs');
const webpack = require('webpack')
const packageJson = require('../package.json')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 在html中引入文件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

const DllPluginMethods = require('./DllPluginMethods')


const mode = process.env.NODE_ENV.split('_')[0]
const PUBLIC_URL = packageJson.homepage
const isProduction = mode === 'production'


const includeOptions = {
  include: path.resolve(__dirname, '../src'),
}
const BasicsCssLoaders = [
  // 模块热更新css需要 样式以style形式存在
  isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: path.resolve(__dirname, 'postcss.config.js')
      }
    }
  }
]

// 基础配置
module.exports = {
  mode,
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: './static/js/[name].[hash:6].js',
    chunkFilename:'./static/js/[name].[hash:6].js',
    path: path.resolve(__dirname, '../dist'),
  },
  cache: true,
  devServer: {
    // port: 8081,
    hot: true, // 模块热加载
    contentBase: path.resolve(__dirname, '../dist'),
    open: true,
    // progress: true
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      '@': '/src',
      '_Components': '/src/components'
    },
    // 第三方包中直接采用 ES5 形式的内容
    mainFields: ['main'],
  },
  module: {
    rules: [
      // {
      //   oneOf: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/antd-mobile'),
          path.resolve(__dirname, '../node_modules/zzy-javascript-devtools'),
          path.resolve(__dirname, '../node_modules/normalize.css/normalize.css')
        ],
        use: BasicsCssLoaders
      },
      {
        test: /\.less$/,
        ...includeOptions,
        use: [
          ...BasicsCssLoaders,
          'less-loader'
        ]
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
        test: /\.(jpe?g|png|gif|svg)$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../node_modules/zzy-javascript-devtools/lib')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name]_[hash:6].[ext]',
              outputPath: "static/media/"
            }
          },
        ]
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:6].[ext]',
              limit: 5 * 1024, 
              // publicPath: 'static/fonts/',
              outputPath: 'static/fonts/'
            }
          }
        ]
      }
      //   ]
      // }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      hash: 6,
      inject: 'body' // 在body标签下方填入标签
    }),
    new MiniCssExtractPlugin({
      filename: './static/css/main_[hash:6].css'
    }),
    // 设置全局变量
    new webpack.ProvidePlugin({
      React: 'react',
      Component: ['react', 'Component'],
      useState: ['react', 'useState'],
      useEffect: ['react', 'useEffect'],
      // default  添加默认请求
      '_request': [path.resolve(__dirname, '../src/utils/request.js'), 'request']
    }),
    new InterpolateHtmlPlugin(HtmlWebPackPlugin, {
      PUBLIC_URL,
    }),
    new AddAssetHtmlWebpackPlugin([
      ...DllPluginMethods('path')
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/browserIcon.svg'),
        to: './'
      },
    ]),
    ...DllPluginMethods('plugins'),

    // 解决全局变量无法显示的异常
    new webpack.DefinePlugin({
      'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN)
    }),
  ],
  stats: {
    // 去掉mini-css-extract-plugin报的warning
    children: false,
    warningsFilter: (warning) => /Conflicting order between/gm.test(warning)
  }
}
