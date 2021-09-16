const WebpackDevServer = require('webpack-dev-server')
const Webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const openBrowser = require('react-dev-utils/openBrowser');
const chalk = require('react-dev-utils/chalk');
const portfinder = require('portfinder')
const webpackConfigDev = require('../config/webpack.dev')
const webpackConfigProd = require('../config/webpack.prod')
const getNetworkIp = require('../config/getRunningAddress');

const ip = getNetworkIp()

const mode = process.env.NODE_ENV

const webpackConfig = mode === 'development' ? webpackConfigDev : webpackConfigProd

// 设置基础值
portfinder.basePort = 8080

portfinder.getPort((err, port) => {
  if (err) {
    throw new Error(err)
  } else {
    webpackConfig.plugins.push(
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            '运行成功～ ',
            '',
            `运行地址: ${chalk.cyan(`http://localhost:${port}`)}`,
            '',
            `IP地址: ${chalk.cyan(`http://${ip}:${port}`)}`,
            '',
            `当前环境: ${chalk.blue(mode)}`,
            '',
            `当前DOMAIN: ${chalk.green(process.env.DOMAIN)}`
          ]
        },
        clearConsole: true
      })
    )
    process.env.PORT = port

    const compiler = Webpack(webpackConfig)
    const devServerOptions = {
      hot: true, // 模块热加载
      open: false,
      host: '0.0.0.0',
      client: {
        overlay: false,
      },
      // 常开  gzip压缩 但只有在
      compress: true,
    }

    // 提前打开页面，然后通过热加载来拿到start之后的页面信息
    openBrowser(`http://localhost:${port}`)


    const server = new WebpackDevServer(devServerOptions, compiler)
    server.start(port, ip, err => {
      if (err) {
        return console.log(err);
      }
    })
  }
})
