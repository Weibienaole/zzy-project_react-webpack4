const Webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('react-dev-utils/chalk');
const webpackConfigDev = require('../config/webpack.dev')
const webpackConfigProd = require('../config/webpack.prod')

const mode = process.env.NODE_ENV

const webpackConfig = mode === 'development' ? webpackConfigDev : webpackConfigProd

const logConfig = {
  all: false,
  builtAt: true,
  outputPath: true,
  warnings: true,
  errors: true
}

webpackConfig.plugins.push(
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [
        '打包成功～ ',
        `当前环境: ${chalk.green(mode)}`,
        `当前DOMAIN: ${chalk.blue(process.env.DOMAIN)}`
      ]
    },
    clearConsole: true
  })
)

webpackConfig.target = ['web', 'es5']

const compiler = Webpack(webpackConfig)

compiler.run(function (err, status) {
  if (err) {
    console.error(err);
  }
  let { builtAt, outputPath, warnings, errors } = status.toJson(logConfig)
  console.log(
    `
    创建时间：${chalk.green(getTime(builtAt))}
    输出地址：${chalk.cyan(outputPath)}
    包大小查看：${chalk.magenta(mode === 'production' ? 'http://127.0.0.1:8888' : '开发环境不支持此项')}
    警告：${chalk.yellow(JSON.stringify(warnings))}
    报错：${chalk.red(JSON.stringify(errors))}
    `
  )
});

function add0(m) { return m < 10 ? '0' + m : m }
function getTime(time) {
  //shijianchuo是整数，否则要parseInt转换
  const t = new Date(time);
  let y = t.getFullYear();
  let m = t.getMonth() + 1;
  let d = t.getDate();
  let h = t.getHours();
  let mm = t.getMinutes();
  let s = t.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}