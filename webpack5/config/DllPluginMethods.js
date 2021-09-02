const path = require('path')
const dllConfig = require('./webpack_dll.config')
const webpack = require('webpack')
// 根目录绝对路径
const __root = path.resolve(__dirname, '../') + '/'

function DllPluginMethods(type) {
  if (!type) throw Error('no type!')
  let DllPligins = [], DllPath = []
  Object.keys(dllConfig.entry).forEach(name => {
    if (type === 'plugins') {
      DllPligins.push(
        new webpack.DllReferencePlugin({
          context: __root, // 这里的context必须与DllPlugin中的context保持一致
          manifest: path.resolve(__root, 'public/dll/[name].manifest.json').replace(/\[name\]/gi, name)
        })
      )
    } else {
      DllPath = [
        ...DllPath,
        {
          filepath: path.join(`${__root}public/dll/`, '[name].manifest.json'.replace(/\[name\]/gi, name)),
          outputPath: 'dll',
          publicPath: './dll'
        },
        {
          filepath: path.join(`${__root}public/dll/`, dllConfig.output.filename.replace(/\[name\]/gi, name)),
          outputPath: 'dll',
          publicPath: './dll'
        },
      ]
    }
  })
  return type === 'plugins' ? DllPligins : DllPath
}

module.exports = DllPluginMethods