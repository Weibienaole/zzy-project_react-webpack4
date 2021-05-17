import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Page from '@/page/index/index'

function router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Page}></Route>
      </Switch>
    </HashRouter>
  )
}
export default router



/*
<HashRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            // 嵌套路由
            <Home>
              <Route path="/Chil" exact component={Chil}></Route>
            </Home>
          )}
        ></Route>
        // 普通路由
        <Route path="/other" component={Other}></Route>
      </Switch>
    </HashRouter>


*/
