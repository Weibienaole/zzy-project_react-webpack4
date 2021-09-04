import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getUrlData } from 'zzy-javascript-devtools'

import './index.css'
// HOOK写法
function Page() {
  // eslint-disable-next-line no-unused-vars
  const [pageData, setPageData] = useState(null)
  useEffect(() => {
    let url = window.location.href
    console.log(url)
    // let url ='http://localhost:3000/?token=0ffecc644c133f97367dc7f8f1e7a72da5161d1e958af2b0e2a7f22329a04eb777f71cd2038e2e01532424ba629f8460435122bdb2990ca1a6f57cc630099f4300fbf0f2a085eb38d200108ec92783b0c6d1ca2438b7f4e8dd6f1e152add18d96b1e822336348e5df24875f77ce09bfe9ab03077d5c64652b0ef35926565b5f0b7940658857cef6c&top=20'
    let { token } = getUrlData(url)
    console.log(token);
  }, [])

  return <div id="homePage_wrap">hello,zzy</div>
}

export default withRouter(Page)
