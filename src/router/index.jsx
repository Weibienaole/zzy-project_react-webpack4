import { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

/*
  route = [
    {
      path: '页面路径',
      module: '',
      exact: '如果 children 有值，则为false，反之true',
      childrens:[
        ...同上
      ]
    }
  ]

 */

const route = [
  {
    path: '/',
    module: React.lazy(() => import('@/page/index'))
  }
]


function Routes(route) {
  let routes = []
  routes = route.map(({ path, childrens, module }, index) => {
    let Component = module
    return (
      <Route
        key={'Route' + index}
        path={path}
        exact={!childrens}
        render={(props) => (
          <Component {...props}>{childrens?.length > 0 && Routes(childrens)}</Component>
        )}
      ></Route>
    )
  })
  return routes
}

function router() {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          {Routes(route)}
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default router
