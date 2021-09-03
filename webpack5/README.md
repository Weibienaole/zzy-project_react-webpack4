# zzy-react-project(webpack5)

# 基于react webpack为主的移动端项目基础框架。
## 当然，可以将react部分剔除，改为vue也是可以使用的

# 本项目设置了 DllPlugin(react、react-dom)，在public中已经打包了一份，如果更改webpack的Dllplugin配置，需先 yarn dll 重新进行编译，而后再 yarn build

# 亮点
- 极速打包
- 尽我所能的缩小首屏加载时常(prod)
- 全自动的动态链接库
- 不同环境不同配置的webpack
- 更快的配置路由
- 多环境多域名处理
- 在保证包大小的情况下进行浏览器兼容处理
- n个webpack小优化😎
- 集成antd，并设置按需加载
- 控制台更干净，友善的提示
- 运行，打包改用 node API 写法执行 更高的操作上限
- 集成zzy-javascript-devtools(手动狗头～)


大概就这些了，ESLint我还没有装，这个看个人需求咯～
