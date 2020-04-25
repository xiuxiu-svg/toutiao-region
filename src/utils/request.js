import axios from 'axios'
// 加载json-bigint处理大数字
import JSONbig from 'json-bigint'
// const req1 = axios.create()
// req1.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // 不用axios默认的JSON.parse()
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log(err, '转换失败')
      return data
    }
  }]
})

request.interceptors.request.use(function (config) {
  // 把本地的token取出来放到请求头
  const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  // 写死的token 应该动态获取
  // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZX
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
