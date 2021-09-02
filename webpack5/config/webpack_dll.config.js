
const path = require('path');
const webpack = require('webpack')


/*
  动态链接库 配置
*/

// 根目录绝对路径
const __root = path.resolve(__dirname, '../') + '/'


module.exports = {
  mode: 'production',
  context: __root, // 设置项目根路径
  entry: {
    react: ['react', 'react-dom'],
    // axios: ['axios']
  },
  resolve: {
    modules: [path.resolve(__root, 'node_modules')],
    extensions: ['.js', '.json'],
  },
  output: {
    filename: '_Dll_[name].js',
    path: path.join(__root, 'public/dll'),
    library: '_Dll_[name]',

  },
  plugins: [
    new webpack.DllPlugin({
      name: '_Dll_[name]',  //dll的全局变量名
      path: path.join(__root, 'public/dll/[name].manifest.json'),//描述生成的manifest文件
    })
  ]
}
