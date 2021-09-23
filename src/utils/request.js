import axios from 'axios'
import { Toast } from 'antd-mobile'



const BASE_URL = process.env.NODE_ENV === 'development' ? 'testmallapi' : 'mallapi'

function request({ url, data = {}, token = null }) {
  Toast.loading('加载中...', 30, () => {
    Toast.hide()
    Toast.fail('加载失败，请重试', 2)
    return
  })

  let u = `https://${BASE_URL}.${process.env.DOMAIN}.com/${url}.do?token=${token}&time=&sign=`
  return new Promise((reslove, reject) => {
    axios
      .post(u, data)
      .then(function (res) {
        if (res.data.code === 0) {
          Toast.hide()
          reslove(res.data.body)
        } else {
          Toast.hide()
          Toast.offline(res.data.msg, 5)
          reject(res)
        }
      })
      .catch(function (err) {
        Toast.hide()
        Toast.fail(err.msg || '加载失败，请重试', 5)
        reject(err)
      })
  })
}

function formDataRequest({ url, data = {}, token = null }) {
  Toast.loading('加载中...', 30, () => {
    Toast.hide()
    Toast.fail('加载失败，请重试', 2)
    return
  })

  let u = `https://${BASE_URL}.${process.env.DOMAIN}.com/${url}.do?token=${token}&time=&sign=`
  let formData = new FormData()
  for(let i in data){
    formData.append(i, data[i])
  }
  return new Promise((reslove, reject) => {
    axios
      .post(u, formData)
      .then(function (res) {
        if (res.data.code === 0) {
          Toast.hide()
          reslove(res.data.body)
        } else {
          Toast.hide()
          Toast.offline(res.data.msg, 5)
          reject(res)
        }
      })
      .catch(function (err) {
        Toast.hide()
        Toast.fail(err.msg || '加载失败，请重试', 5)
        reject(err)
      })
  })
}
export { request, formDataRequest }
