import { Suspense } from 'react'
import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

/*
  route = [
    {
      path: '页面路径',
      module: '',
      exact: '不设置的话  如果 children 有值，则为false，反之true',
      childrens:[
        ...同上
      ]
    }
  ]

  嵌套路由：
  path必须是 父的path + /子path  index下有一个index2的话，就是 /index/index2.
  不能给 path 为 / 的路由设置子路由

  父路由的exact必须为false！ 不然启动严格校验后不显示子路由内容

  设置子路由后，父路由页面必须在最底部加入 {prrops.children} 才能正常显示！

  重定向
  如果要将首页具有子路由，就将首页，默认 '/' 页面 重定向到一个 具有新path的首页，然后创建子路由。
  
  example: 
  
  {
    path: '/',
    rediect: '/index',
    module: ''
  },
  {
    path: '/index',
    module: 'page/index/index'
  },
  {
    path: '/index2',
    module: 'page/index2',
    childrens: [
      {
        path: '/index2/:123',
        module: 'page/index/index3child',
        exact: false
      }
    ]
  }
 */

const route = [
  {
    path: '/',
    module: '/page/index'
  }
]

function getModule(routes) {
  return routes.map((item) => ({
    ...item,
    module: item.module && React.lazy(() => import(`@/${item.module}`)),
    childrens: item?.childrens ? getModule(item.childrens) : []
  }))
}

function Routes(route) {
  return route.map(
    ({ path, childrens = [], module, rediect, exact }, index) => {
      const Component = module
      return (
        <Route
          key={'Route' + index}
          path={path}
          exact={typeof exact === 'boolean' ? exact : childrens.length === 0}
          render={(props) => {
            // 重定向
            if (rediect && !module) {
              return <Redirect to={rediect} />
            } else {
              return (
                <Component {...props}>
                  {childrens.length > 0 && <Switch>{Routes(childrens)}</Switch>}
                </Component>
              )
            }
          }}
        ></Route>
      )
    }
  )
}

function router() {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>{Routes(getModule(route))}</Switch>
      </Suspense>
    </HashRouter>
  )
}

export default router
