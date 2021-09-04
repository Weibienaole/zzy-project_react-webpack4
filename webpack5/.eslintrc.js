// link: https://cn.eslint.org/docs/user-guide/configuring
module.exports = {
  // 一个环境定义了一组预定义的全局变量
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'commonjs': true,
    'es6': true,
    'amd': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      // 开启jsx语法
      'jsx': true,
      // 全局作用域下使用return语句
      'globalReturn': true,
    },
    // ECMAScript 版本始终使用最新的版本
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    // 不加分号
    'semi': 0,
    // 箭头函数中，在需要的时候，在参数外使用小括号（只有一个参数时，可以不适用括号，其它情况下都需要使用括号）
    'arrow-parens': [
      2,
      'as-needed'
    ],
    //箭头函数中的箭头前后需要留空格
    'arrow-spacing': [
      2,
      {
        'before': true,
        'after': true
      }
    ],
    'eqeqeq': [
      2,
      'allow-null'
    ],
    //这个就是关于用什么来缩进了，4个空格=两个tab .
    'indent': [
      1,
      2
    ],
    //构造函数首字母大写
    'new-cap': [
      2,
      {
        'newIsCap': true,
        'capIsNew': false
      }
    ],
    //const申明的变量禁止修改
    'no-const-assign': 2,
    //函数参数禁止重名
    'no-dupe-args': 2,
    //在switch语句中禁止重复的case
    'no-duplicate-case': 2,
    //不要把空格和tab混用
    'no-mixed-spaces-and-tabs': 2,
    //使用单引号
    'quotes': [
      1,
      'single',
      'avoid-escape'
    ],
  },
  'root': true,
  // 允许的全局变量
  'globals': {
    'React': true,
    'Component': true,
    'useState': true,
    'useEffect': true,
    '_request': true,
  },
};
