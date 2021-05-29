import { withRouter, Link } from 'react-router-dom'
import { devtools } from 'zzy-javascript-devtools'

import './index.less'
function Page({children}) {
  let [pageData, setPageData] = useState(1)
  useEffect(() => {
    console.log(window.location.href)
    let url = window.location.href
    // let url ='http://localhost:3000/?token=0ffecc644c133f97367dc7f8f1e7a72da5161d1e958af2b0e2a7f22329a04eb777f71cd2038e2e01532424ba629f8460435122bdb2990ca1a6f57cc630099f4300fbf0f2a085eb38d200108ec92783b0c6d1ca2438b7f4e8dd6f1e152add18d96b1e822336348e5df24875f77ce09bfe9ab03077d5c64652b0ef35926565b5f0b7940658857cef6c'
    // let { token } = devtools.getUrlData(url)
    // console.log(token)
    setTimeout(() => {
      setPageData(2)
    }, 1000);
  }, [])
  return (
    <div className="page-wrap">
      hello,react
      {pageData}
    </div>
  )
}

export default withRouter(Page)
