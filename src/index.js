import { render } from 'react-dom'
import { devtools } from 'zzy-javascript-devtools'

import App from './App.js'

import './index.css'

// JSbridge 初始化
devtools.JSB_init()

// rem 设置
devtools.setDomRem(8)

// if (process.env.NODE_ENV === 'production') console.log = function () { }

render(
  <App />,
  document.getElementById('root')
)
